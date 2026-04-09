import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inspection } from './entities/inspection.entity';
import { Ncr } from './entities/ncr.entity';
import { Coa } from './entities/coa.entity';

@Injectable()
export class QualityService {
  constructor(
    @InjectRepository(Inspection)
    private readonly inspectionRepository: Repository<Inspection>,
    @InjectRepository(Ncr)
    private readonly ncrRepository: Repository<Ncr>,
    @InjectRepository(Coa)
    private readonly coaRepository: Repository<Coa>,
  ) {}

  async createInspection(data: Partial<Inspection>): Promise<Inspection> {
    const inspection = this.inspectionRepository.create(data);
    return this.inspectionRepository.save(inspection);
  }

  async findAllInspections(page = 1, limit = 20): Promise<{ data: Inspection[]; total: number }> {
    const [data, total] = await this.inspectionRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { inspectedAt: 'DESC' },
    });
    return { data, total };
  }

  async findInspection(id: string): Promise<Inspection> {
    const inspection = await this.inspectionRepository.findOne({ where: { id } });
    if (!inspection) {
      throw new NotFoundException(`Inspection with id ${id} not found`);
    }
    return inspection;
  }

  async findInspectionsByBatch(batchId: string): Promise<Inspection[]> {
    return this.inspectionRepository.find({
      where: { batchId },
      order: { inspectedAt: 'DESC' },
    });
  }

  async createNcr(data: Partial<Ncr>): Promise<Ncr> {
    const ncr = this.ncrRepository.create(data);
    return this.ncrRepository.save(ncr);
  }

  async findNcr(id: string): Promise<Ncr> {
    const ncr = await this.ncrRepository.findOne({ where: { id } });
    if (!ncr) {
      throw new NotFoundException(`NCR with id ${id} not found`);
    }
    return ncr;
  }

  async findAllNcrs(page = 1, limit = 20): Promise<{ data: Ncr[]; total: number }> {
    const [data, total] = await this.ncrRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total };
  }

  async updateNcr(id: string, data: Partial<Ncr>): Promise<Ncr> {
    const ncr = await this.findNcr(id);
    Object.assign(ncr, data);
    return this.ncrRepository.save(ncr);
  }

  async createCoa(data: Partial<Coa>): Promise<Coa> {
    const coa = this.coaRepository.create(data);
    return this.coaRepository.save(coa);
  }

  async findCoasByBatch(batchId: string): Promise<Coa[]> {
    return this.coaRepository.find({
      where: { batchId },
      order: { issuedAt: 'DESC' },
    });
  }
}
