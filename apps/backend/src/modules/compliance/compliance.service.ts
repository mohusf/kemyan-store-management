import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { SdsRecord } from './entities/sds-record.entity';
import { WasteRecord } from './entities/waste-record.entity';
import { PpeIssuance } from './entities/ppe-issuance.entity';

@Injectable()
export class ComplianceService {
  constructor(
    @InjectRepository(SdsRecord)
    private readonly sdsRepository: Repository<SdsRecord>,
    @InjectRepository(WasteRecord)
    private readonly wasteRepository: Repository<WasteRecord>,
    @InjectRepository(PpeIssuance)
    private readonly ppeRepository: Repository<PpeIssuance>,
  ) {}

  async createSdsRecord(data: Partial<SdsRecord>): Promise<SdsRecord> {
    const record = this.sdsRepository.create(data);
    return this.sdsRepository.save(record);
  }

  async findSdsByMaterial(materialId: string): Promise<SdsRecord[]> {
    return this.sdsRepository.find({
      where: { materialId },
      order: { effectiveDate: 'DESC' },
    });
  }

  async findCurrentSds(materialId: string): Promise<SdsRecord> {
    const sds = await this.sdsRepository.findOne({
      where: { materialId, supersededDate: IsNull() },
      order: { effectiveDate: 'DESC' },
    });
    if (!sds) {
      throw new NotFoundException(`No active SDS found for material ${materialId}`);
    }
    return sds;
  }

  async createWasteRecord(data: Partial<WasteRecord>): Promise<WasteRecord> {
    const record = this.wasteRepository.create(data);
    return this.wasteRepository.save(record);
  }

  async findWasteRecords(page = 1, limit = 20): Promise<{ data: WasteRecord[]; total: number }> {
    const [data, total] = await this.wasteRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { disposedAt: 'DESC' },
    });
    return { data, total };
  }

  async issuePpe(data: Partial<PpeIssuance>): Promise<PpeIssuance> {
    const issuance = this.ppeRepository.create(data);
    return this.ppeRepository.save(issuance);
  }

  async returnPpe(id: string, condition: string): Promise<PpeIssuance> {
    const issuance = await this.ppeRepository.findOne({ where: { id } });
    if (!issuance) {
      throw new NotFoundException(`PPE issuance with id ${id} not found`);
    }
    issuance.returnedAt = new Date();
    issuance.condition = condition;
    return this.ppeRepository.save(issuance);
  }

  async findPpeByUser(userId: string): Promise<PpeIssuance[]> {
    return this.ppeRepository.find({
      where: { userId },
      order: { issuedAt: 'DESC' },
    });
  }
}
