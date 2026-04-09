import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipment } from './entities/equipment.entity';
import { PlantUnit } from './entities/plant-unit.entity';
import { EquipmentTypeCode } from './entities/equipment-type-code.entity';
import { QueryEquipmentDto } from './dto/query-equipment.dto';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
    @InjectRepository(PlantUnit)
    private readonly plantUnitRepository: Repository<PlantUnit>,
    @InjectRepository(EquipmentTypeCode)
    private readonly typeCodeRepository: Repository<EquipmentTypeCode>,
  ) {}

  async findAll(query: QueryEquipmentDto): Promise<{ data: Equipment[]; total: number }> {
    const page = query.page || 1;
    const limit = query.limit || 50;

    const qb = this.equipmentRepository.createQueryBuilder('eq')
      .leftJoinAndSelect('eq.plantUnit', 'pu')
      .leftJoinAndSelect('eq.equipmentTypeCode', 'tc');

    if (query.plantUnitCode) {
      qb.andWhere('pu.unitCode = :unitCode', { unitCode: query.plantUnitCode });
    }
    if (query.equipmentTypeCode) {
      qb.andWhere('tc.code = :typeCode', { typeCode: query.equipmentTypeCode });
    }
    if (query.status) {
      qb.andWhere('eq.status = :status', { status: query.status });
    }
    if (query.criticalityClass) {
      qb.andWhere('eq.criticalityClass = :crit', { crit: query.criticalityClass });
    }
    if (query.pmStrategy) {
      qb.andWhere('eq.pmStrategy = :pm', { pm: query.pmStrategy });
    }
    if (query.search) {
      qb.andWhere(
        '(eq.tagNumber ILIKE :search OR eq.descriptionEn ILIKE :search OR eq.serialNumber ILIKE :search)',
        { search: `%${query.search}%` },
      );
    }

    qb.orderBy('pu.sortOrder', 'ASC')
      .addOrderBy('eq.tagNumber', 'ASC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, total };
  }

  async findOne(id: string): Promise<Equipment> {
    const item = await this.equipmentRepository.findOne({
      where: { id },
      relations: ['plantUnit', 'equipmentTypeCode'],
    });
    if (!item) {
      throw new NotFoundException(`Equipment with id ${id} not found`);
    }
    return item;
  }

  async findByPlantUnit(unitCode: string): Promise<Equipment[]> {
    return this.equipmentRepository.createQueryBuilder('eq')
      .leftJoinAndSelect('eq.plantUnit', 'pu')
      .leftJoinAndSelect('eq.equipmentTypeCode', 'tc')
      .where('pu.unitCode = :unitCode', { unitCode })
      .orderBy('eq.tagNumber', 'ASC')
      .getMany();
  }

  async getPlantUnits(): Promise<(PlantUnit & { equipmentCount: number })[]> {
    const units = await this.plantUnitRepository.find({ order: { sortOrder: 'ASC' } });
    const counts = await this.equipmentRepository
      .createQueryBuilder('eq')
      .select('eq.plant_unit_id', 'plantUnitId')
      .addSelect('COUNT(*)', 'count')
      .groupBy('eq.plant_unit_id')
      .getRawMany();

    const countMap = new Map(counts.map((c) => [c.plantUnitId, parseInt(c.count, 10)]));
    return units.map((u) => ({ ...u, equipmentCount: countMap.get(u.id) || 0 }));
  }

  async getTypeCodes(): Promise<EquipmentTypeCode[]> {
    return this.typeCodeRepository.find({ order: { code: 'ASC' } });
  }
}
