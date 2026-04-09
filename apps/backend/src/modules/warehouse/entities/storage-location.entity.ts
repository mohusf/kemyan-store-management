import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Zone } from './zone.entity';

export enum LocationType {
  SHELF = 'shelf',
  FLOOR = 'floor',
  PALLET = 'pallet',
  TANK = 'tank',
  COLD_ROOM = 'cold_room',
  OUTDOOR = 'outdoor',
}

@Entity('storage_locations')
export class StorageLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 255, name: 'name_ar' })
  nameAr: string;

  @Column({ type: 'varchar', length: 255, name: 'name_en' })
  nameEn: string;

  @Column({ type: 'uuid', name: 'zone_id', nullable: true })
  zoneId: string;

  @ManyToOne(() => Zone)
  @JoinColumn({ name: 'zone_id' })
  zone: Zone;

  @Column({ type: 'varchar', length: 50, nullable: true })
  aisle: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  rack: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  bin: string;

  @Column({
    type: 'varchar',
    length: 30,
    default: LocationType.SHELF,
    name: 'location_type',
  })
  locationType: string;

  @Column({ type: 'jsonb', name: 'compatibility_groups', default: '[]' })
  compatibilityGroups: string[];

  @Column({ type: 'decimal', precision: 12, scale: 2, name: 'max_capacity', nullable: true })
  maxCapacity: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, name: 'current_occupancy', default: 0 })
  currentOccupancy: number;

  @Column({ type: 'decimal', precision: 5, scale: 1, name: 'temperature_min', nullable: true })
  temperatureMin: number;

  @Column({ type: 'decimal', precision: 5, scale: 1, name: 'temperature_max', nullable: true })
  temperatureMax: number;

  @Column({ type: 'decimal', precision: 5, scale: 1, name: 'humidity_max', nullable: true })
  humidityMax: number;

  @Column({ type: 'jsonb', name: 'required_ppe', default: '[]' })
  requiredPpe: string[];

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
