import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';
import { SupplierEvaluation } from './entities/supplier-evaluation.entity';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
    @InjectRepository(SupplierEvaluation)
    private readonly evaluationRepository: Repository<SupplierEvaluation>,
  ) {}

  async create(data: Partial<Supplier>): Promise<Supplier> {
    const supplier = this.supplierRepository.create(data);
    return this.supplierRepository.save(supplier);
  }

  async findAll(page = 1, limit = 20): Promise<{ data: Supplier[]; total: number }> {
    const [data, total] = await this.supplierRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total };
  }

  async findOne(id: string): Promise<Supplier> {
    const supplier = await this.supplierRepository.findOne({ where: { id } });
    if (!supplier) {
      throw new NotFoundException(`Supplier with id ${id} not found`);
    }
    return supplier;
  }

  async update(id: string, data: Partial<Supplier>): Promise<Supplier> {
    const supplier = await this.findOne(id);
    Object.assign(supplier, data);
    return this.supplierRepository.save(supplier);
  }

  async addEvaluation(data: Partial<SupplierEvaluation>): Promise<SupplierEvaluation> {
    const evaluation = this.evaluationRepository.create(data);
    const saved = await this.evaluationRepository.save(evaluation);

    // Update supplier performance score
    await this.recalculatePerformanceScore(data.supplierId);

    return saved;
  }

  async getEvaluations(supplierId: string): Promise<SupplierEvaluation[]> {
    return this.evaluationRepository.find({
      where: { supplierId },
      order: { evaluationDate: 'DESC' },
    });
  }

  private async recalculatePerformanceScore(supplierId: string): Promise<void> {
    const evaluations = await this.evaluationRepository.find({
      where: { supplierId },
      order: { evaluationDate: 'DESC' },
      take: 10,
    });

    if (evaluations.length === 0) return;

    const avgScore =
      evaluations.reduce((sum, e) => sum + Number(e.overallScore), 0) /
      evaluations.length;

    await this.supplierRepository.update(supplierId, {
      performanceScore: Math.round(avgScore * 100) / 100,
    });
  }
}
