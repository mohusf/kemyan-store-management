import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from './entities/material.entity';
import { CreateMaterialDto } from './dto/create-material.dto';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
  ) {}

  async create(dto: CreateMaterialDto): Promise<Material> {
    const material = this.materialRepository.create(dto);
    return this.materialRepository.save(material);
  }

  async findAll(page = 1, limit = 20): Promise<{ data: Material[]; total: number }> {
    const [data, total] = await this.materialRepository.findAndCount({
      relations: ['category'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total };
  }

  async findOne(id: string): Promise<Material> {
    const material = await this.materialRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!material) {
      throw new NotFoundException(`Material with id ${id} not found`);
    }
    return material;
  }

  async findByCode(code: string): Promise<Material> {
    const material = await this.materialRepository.findOne({
      where: { code },
      relations: ['category'],
    });
    if (!material) {
      throw new NotFoundException(`Material with code ${code} not found`);
    }
    return material;
  }

  async update(id: string, dto: Partial<CreateMaterialDto>): Promise<Material> {
    const material = await this.findOne(id);
    Object.assign(material, dto);
    return this.materialRepository.save(material);
  }

  async remove(id: string): Promise<void> {
    const material = await this.findOne(id);
    await this.materialRepository.remove(material);
  }
}
