import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PlantUnit } from './plant-unit.entity';
import { EquipmentTypeCode } from './equipment-type-code.entity';

@Entity('equipment')
export class Equipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true, name: 'tag_number' })
  tagNumber: string;

  @Column({ type: 'uuid', name: 'plant_unit_id' })
  plantUnitId: string;

  @Column({ type: 'uuid', name: 'equipment_type_code_id' })
  equipmentTypeCodeId: string;

  @Column({ type: 'int', name: 'sequential_number' })
  sequentialNumber: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  suffix: string;

  @Column({ type: 'varchar', length: 500, name: 'description_en' })
  descriptionEn: string;

  @Column({ type: 'varchar', length: 500, name: 'description_ar', nullable: true })
  descriptionAr: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  location: string;

  @Column({ type: 'varchar', length: 5, name: 'criticality_class', nullable: true })
  criticalityClass: string;

  @Column({ type: 'varchar', length: 20, name: 'pm_strategy', nullable: true })
  pmStrategy: string;

  @Column({ type: 'text', name: 'associated_pm_wis', nullable: true })
  associatedPmWis: string;

  @Column({ type: 'varchar', length: 100, name: 'serial_number', nullable: true })
  serialNumber: string;

  @Column({ type: 'varchar', length: 30, default: 'active' })
  status: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  manufacturer: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  model: string;

  @Column({ type: 'jsonb', nullable: true })
  specifications: Record<string, unknown>;

  @ManyToOne(() => PlantUnit)
  @JoinColumn({ name: 'plant_unit_id' })
  plantUnit: PlantUnit;

  @ManyToOne(() => EquipmentTypeCode)
  @JoinColumn({ name: 'equipment_type_code_id' })
  equipmentTypeCode: EquipmentTypeCode;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
