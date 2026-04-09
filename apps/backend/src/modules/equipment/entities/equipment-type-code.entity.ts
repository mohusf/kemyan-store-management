import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('equipment_type_codes')
export class EquipmentTypeCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 5, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 200, name: 'description_en' })
  descriptionEn: string;

  @Column({ type: 'varchar', length: 200, name: 'description_ar', nullable: true })
  descriptionAr: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
