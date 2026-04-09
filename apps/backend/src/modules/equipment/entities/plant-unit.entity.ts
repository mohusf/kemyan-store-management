import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('plant_units')
export class PlantUnit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 5, unique: true, name: 'unit_code' })
  unitCode: string;

  @Column({ type: 'varchar', length: 200, name: 'name_en' })
  nameEn: string;

  @Column({ type: 'varchar', length: 200, name: 'name_ar', nullable: true })
  nameAr: string;

  @Column({ type: 'int', name: 'sort_order', default: 0 })
  sortOrder: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
