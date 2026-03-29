import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventBus } from '@nestjs/cqrs';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { PurchaseOrderLine } from './entities/purchase-order-line.entity';
import { GoodsReceivedNote } from './entities/goods-received-note.entity';
import { PoApprovedEvent } from '../../common/events/po-approved.event';

@Injectable()
export class ProcurementService {
  constructor(
    @InjectRepository(PurchaseOrder)
    private readonly poRepository: Repository<PurchaseOrder>,
    @InjectRepository(PurchaseOrderLine)
    private readonly poLineRepository: Repository<PurchaseOrderLine>,
    @InjectRepository(GoodsReceivedNote)
    private readonly grnRepository: Repository<GoodsReceivedNote>,
    private readonly eventBus: EventBus,
  ) {}

  async createPurchaseOrder(
    data: Partial<PurchaseOrder>,
    lines: Partial<PurchaseOrderLine>[],
  ): Promise<PurchaseOrder> {
    const po = this.poRepository.create(data);
    const savedPo = await this.poRepository.save(po);

    const poLines = lines.map((line) =>
      this.poLineRepository.create({ ...line, purchaseOrderId: savedPo.id }),
    );
    await this.poLineRepository.save(poLines);

    return this.findPurchaseOrder(savedPo.id);
  }

  async findPurchaseOrder(id: string): Promise<PurchaseOrder> {
    const po = await this.poRepository.findOne({
      where: { id },
      relations: ['lines'],
    });
    if (!po) {
      throw new NotFoundException(`Purchase order with id ${id} not found`);
    }
    return po;
  }

  async findAllPurchaseOrders(page = 1, limit = 20): Promise<{ data: PurchaseOrder[]; total: number }> {
    const [data, total] = await this.poRepository.findAndCount({
      relations: ['lines'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total };
  }

  async approvePurchaseOrder(id: string, approvedBy: string): Promise<PurchaseOrder> {
    const po = await this.findPurchaseOrder(id);
    po.status = 'approved' as any;
    po.approvedBy = approvedBy;
    const saved = await this.poRepository.save(po);

    this.eventBus.publish(new PoApprovedEvent(id, po.poNumber, po.supplierId));

    return saved;
  }

  async createGoodsReceivedNote(data: Partial<GoodsReceivedNote>): Promise<GoodsReceivedNote> {
    const grn = this.grnRepository.create(data);
    return this.grnRepository.save(grn);
  }

  async findGoodsReceivedNote(id: string): Promise<GoodsReceivedNote> {
    const grn = await this.grnRepository.findOne({ where: { id } });
    if (!grn) {
      throw new NotFoundException(`GRN with id ${id} not found`);
    }
    return grn;
  }
}
