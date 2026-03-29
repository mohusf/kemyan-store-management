import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StorageLocation } from '../entities/storage-location.entity';
import { Zone } from '../entities/zone.entity';

interface CompatibilityCheck {
  isCompatible: boolean;
  warnings: string[];
  errors: string[];
}

@Injectable()
export class CompatibilityService {
  // Chemical incompatibility matrix: groups that must NOT be stored together
  private readonly incompatibleGroups: Map<string, string[]> = new Map([
    ['acids', ['bases', 'oxidizers', 'flammables', 'water-reactive']],
    ['bases', ['acids', 'metals']],
    ['oxidizers', ['acids', 'flammables', 'organics']],
    ['flammables', ['oxidizers', 'acids']],
    ['water-reactive', ['acids', 'bases', 'aqueous']],
    ['organics', ['oxidizers', 'strong-acids']],
  ]);

  constructor(
    @InjectRepository(StorageLocation)
    private readonly locationRepository: Repository<StorageLocation>,
    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>,
  ) {}

  async validateChemicalCompatibility(
    materialCompatibilityGroups: string[],
    locationId: string,
  ): Promise<CompatibilityCheck> {
    const location = await this.locationRepository.findOne({
      where: { id: locationId },
      relations: ['zone'],
    });

    if (!location) {
      throw new BadRequestException(`Storage location ${locationId} not found`);
    }

    const warnings: string[] = [];
    const errors: string[] = [];

    // Check against location compatibility groups
    const locationGroups = location.compatibilityGroups || [];
    for (const materialGroup of materialCompatibilityGroups) {
      const incompatible = this.incompatibleGroups.get(materialGroup) || [];

      for (const locGroup of locationGroups) {
        if (incompatible.includes(locGroup)) {
          errors.push(
            `Material group "${materialGroup}" is incompatible with existing group "${locGroup}" at location ${location.code}`,
          );
        }
      }
    }

    // Check zone-level restrictions
    if (location.zone) {
      const allowedGroups = location.zone.allowedCompatibilityGroups || [];
      if (allowedGroups.length > 0) {
        for (const materialGroup of materialCompatibilityGroups) {
          if (!allowedGroups.includes(materialGroup)) {
            warnings.push(
              `Material group "${materialGroup}" is not in the allowed groups for zone ${location.zone.code}`,
            );
          }
        }
      }
    }

    return {
      isCompatible: errors.length === 0,
      warnings,
      errors,
    };
  }
}
