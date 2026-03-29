import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StorageLocation } from './entities/storage-location.entity';
import { Zone } from './entities/zone.entity';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(StorageLocation)
    private readonly locationRepository: Repository<StorageLocation>,
    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>,
  ) {}

  async findAllLocations(page = 1, limit = 20): Promise<{ data: StorageLocation[]; total: number }> {
    const [data, total] = await this.locationRepository.findAndCount({
      relations: ['zone'],
      skip: (page - 1) * limit,
      take: limit,
      order: { code: 'ASC' },
    });
    return { data, total };
  }

  async findLocation(id: string): Promise<StorageLocation> {
    const location = await this.locationRepository.findOne({
      where: { id },
      relations: ['zone'],
    });
    if (!location) {
      throw new NotFoundException(`Storage location with id ${id} not found`);
    }
    return location;
  }

  async createLocation(data: Partial<StorageLocation>): Promise<StorageLocation> {
    const location = this.locationRepository.create(data);
    return this.locationRepository.save(location);
  }

  async updateLocation(id: string, data: Partial<StorageLocation>): Promise<StorageLocation> {
    const location = await this.findLocation(id);
    Object.assign(location, data);
    return this.locationRepository.save(location);
  }

  async findAllZones(): Promise<Zone[]> {
    return this.zoneRepository.find({ order: { code: 'ASC' } });
  }

  async findZone(id: string): Promise<Zone> {
    const zone = await this.zoneRepository.findOne({ where: { id } });
    if (!zone) {
      throw new NotFoundException(`Zone with id ${id} not found`);
    }
    return zone;
  }

  async createZone(data: Partial<Zone>): Promise<Zone> {
    const zone = this.zoneRepository.create(data);
    return this.zoneRepository.save(zone);
  }
}
