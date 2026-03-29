import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum ZoneType {
  RM_ACID = 'RM-ACID',
  RM_CALCIUM = 'RM-CALCIUM',
  RM_GENERAL = 'RM-GENERAL',
  RM_FLAMMABLE = 'RM-FLAMMABLE',
  RM_OXIDIZER = 'RM-OXIDIZER',
  FG = 'FG',
  QC_HOLD = 'QC-HOLD',
  QUARANTINE = 'QUARANTINE',
  PACKAGING = 'PACKAGING',
  WASTE = 'WASTE',
  COLD_STORAGE = 'COLD-STORAGE',
}

@Entity('zones')
export class Zone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 255, name: 'name_ar' })
  nameAr: string;

  @Column({ type: 'varchar', length: 255, name: 'name_en' })
  nameEn: string;

  @Column({
    type: 'varchar',
    length: 30,
    name: 'zone_type',
  })
  zoneType: string;

  @Column({ type: 'jsonb', name: 'allowed_compatibility_groups', default: '[]' })
  allowedCompatibilityGroups: string[];

  @Column({ type: 'jsonb', name: 'safety_equipment', default: '[]' })
  safetyEquipment: Record<string, any>[];

  @Column({ type: 'decimal', precision: 5, scale: 2, name: 'max_temperature', nullable: true })
  maxTemperature: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: 'max_humidity', nullable: true })
  maxHumidity: number;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
