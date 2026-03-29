import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { EventBus } from '@nestjs/cqrs';
import { InventoryTransaction, TransactionType } from './entities/inventory-transaction.entity';
import { Batch, QualityStatus } from './entities/batch.entity';
import { IssueStockDto } from './dto/issue-stock.dto';
import { ReceiveStockDto } from './dto/receive-stock.dto';
import { MaterialReceivedEvent } from '../../common/events/material-received.event';
import { StockBelowReorderEvent } from '../../common/events/stock-below-reorder.event';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryTransaction)
    private readonly transactionRepository: Repository<InventoryTransaction>,
    @InjectRepository(Batch)
    private readonly batchRepository: Repository<Batch>,
    private readonly dataSource: DataSource,
    private readonly eventBus: EventBus,
  ) {}

  async issueStock(dto: IssueStockDto, performedBy: string): Promise<InventoryTransaction> {
    return this.dataSource.transaction(async (manager) => {
      const batch = await manager.findOne(Batch, { where: { id: dto.batchId } });
      if (!batch) {
        throw new NotFoundException(`Batch ${dto.batchId} not found`);
      }
      if (Number(batch.quantityAvailable) < dto.quantity) {
        throw new BadRequestException('Insufficient stock in batch');
      }

      batch.quantityAvailable = Number(batch.quantityAvailable) - dto.quantity;
      await manager.save(batch);

      const runningBalance = await this.calculateRunningBalance(
        dto.materialId,
        dto.locationId,
        manager,
      );

      const transaction = manager.create(InventoryTransaction, {
        batchId: dto.batchId,
        materialId: dto.materialId,
        locationId: dto.locationId,
        transactionType: TransactionType.ISSUE,
        quantity: -dto.quantity,
        referenceType: dto.referenceType,
        referenceId: dto.referenceId,
        performedBy,
        reason: dto.reason,
        runningBalance: runningBalance - dto.quantity,
      });

      return manager.save(transaction);
    });
  }

  async receiveStock(dto: ReceiveStockDto, performedBy: string): Promise<InventoryTransaction> {
    return this.dataSource.transaction(async (manager) => {
      let batch = await manager.findOne(Batch, {
        where: { lotNumber: dto.lotNumber },
      });

      if (!batch) {
        batch = manager.create(Batch, {
          materialId: dto.materialId,
          lotNumber: dto.lotNumber,
          supplierId: dto.supplierId,
          supplierBatchNumber: dto.supplierBatchNumber,
          manufactureDate: dto.manufactureDate ? new Date(dto.manufactureDate) : undefined,
          expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : undefined,
          receivedDate: new Date(),
          quantityReceived: dto.quantity,
          quantityAvailable: dto.quantity,
          qualityStatus: QualityStatus.PENDING,
          storageLocationId: dto.locationId,
        });
        batch = await manager.save(batch);
      } else {
        batch.quantityReceived = Number(batch.quantityReceived) + dto.quantity;
        batch.quantityAvailable = Number(batch.quantityAvailable) + dto.quantity;
        await manager.save(batch);
      }

      const runningBalance = await this.calculateRunningBalance(
        dto.materialId,
        dto.locationId,
        manager,
      );

      const transaction = manager.create(InventoryTransaction, {
        batchId: batch.id,
        materialId: dto.materialId,
        locationId: dto.locationId,
        transactionType: TransactionType.RECEIVE,
        quantity: dto.quantity,
        referenceType: dto.referenceType,
        referenceId: dto.referenceId,
        performedBy,
        reason: dto.reason,
        runningBalance: runningBalance + dto.quantity,
      });

      const saved = await manager.save(transaction);

      this.eventBus.publish(
        new MaterialReceivedEvent(dto.materialId, batch.id, dto.quantity),
      );

      return saved;
    });
  }

  async transferStock(
    batchId: string,
    materialId: string,
    fromLocationId: string,
    toLocationId: string,
    quantity: number,
    performedBy: string,
    reason?: string,
  ): Promise<{ outTransaction: InventoryTransaction; inTransaction: InventoryTransaction }> {
    return this.dataSource.transaction(async (manager) => {
      const batch = await manager.findOne(Batch, { where: { id: batchId } });
      if (!batch) {
        throw new NotFoundException(`Batch ${batchId} not found`);
      }

      if (Number(batch.quantityAvailable) < quantity) {
        throw new BadRequestException('Insufficient stock in batch for transfer');
      }

      batch.quantityAvailable = Number(batch.quantityAvailable) - quantity;
      await manager.save(batch);

      const outBalance = await this.calculateRunningBalance(materialId, fromLocationId, manager);
      const outTransaction = manager.create(InventoryTransaction, {
        batchId,
        materialId,
        locationId: fromLocationId,
        transactionType: TransactionType.TRANSFER,
        quantity: -quantity,
        referenceType: 'transfer',
        referenceId: batchId,
        performedBy,
        reason,
        runningBalance: outBalance - quantity,
      });

      const inBalance = await this.calculateRunningBalance(materialId, toLocationId, manager);
      const inTransaction = manager.create(InventoryTransaction, {
        batchId,
        materialId,
        locationId: toLocationId,
        transactionType: TransactionType.TRANSFER,
        quantity,
        referenceType: 'transfer',
        referenceId: batchId,
        performedBy,
        reason,
        runningBalance: inBalance + quantity,
      });

      return {
        outTransaction: await manager.save(outTransaction),
        inTransaction: await manager.save(inTransaction),
      };
    });
  }

  async adjustStock(
    batchId: string,
    materialId: string,
    locationId: string,
    quantity: number,
    performedBy: string,
    reason: string,
  ): Promise<InventoryTransaction> {
    return this.dataSource.transaction(async (manager) => {
      const batch = await manager.findOne(Batch, { where: { id: batchId } });
      if (!batch) {
        throw new NotFoundException(`Batch ${batchId} not found`);
      }

      batch.quantityAvailable = Number(batch.quantityAvailable) + quantity;
      await manager.save(batch);

      const runningBalance = await this.calculateRunningBalance(materialId, locationId, manager);

      const transactionType =
        quantity >= 0 ? TransactionType.ADJUST : TransactionType.ADJUST;

      const transaction = manager.create(InventoryTransaction, {
        batchId,
        materialId,
        locationId,
        transactionType,
        quantity,
        referenceType: 'adjustment',
        referenceId: batchId,
        performedBy,
        reason,
        runningBalance: runningBalance + quantity,
      });

      return manager.save(transaction);
    });
  }

  async getRunningBalance(materialId: string, locationId: string): Promise<number> {
    return this.calculateRunningBalance(materialId, locationId);
  }

  private async calculateRunningBalance(
    materialId: string,
    locationId: string,
    manager?: any,
  ): Promise<number> {
    const repo = manager
      ? manager.getRepository(InventoryTransaction)
      : this.transactionRepository;

    const result = await repo
      .createQueryBuilder('t')
      .select('COALESCE(SUM(t.quantity), 0)', 'balance')
      .where('t.material_id = :materialId', { materialId })
      .andWhere('t.location_id = :locationId', { locationId })
      .getRawOne();

    return parseFloat(result.balance);
  }
}
