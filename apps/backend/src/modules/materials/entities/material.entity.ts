import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MaterialCategory } from './material-category.entity';

@Entity('materials')
export class Material {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 255, name: 'name_ar' })
  nameAr: string;

  @Column({ type: 'varchar', length: 255, name: 'name_en' })
  nameEn: string;

  @Column({ type: 'uuid', name: 'category_id', nullable: true })
  categoryId: string;

  @ManyToOne(() => MaterialCategory)
  @JoinColumn({ name: 'category_id' })
  category: MaterialCategory;

  @Column({ type: 'varchar', length: 20, name: 'unit_of_measure' })
  unit: string;

  @Column({ type: 'jsonb', name: 'ghs_classification', nullable: true })
  ghsClassification: Record<string, any>;

  @Column({ type: 'decimal', precision: 12, scale: 3, name: 'reorder_point', default: 0 })
  reorderPoint: number;

  @Column({ type: 'decimal', precision: 12, scale: 3, name: 'reorder_quantity', default: 0 })
  reorderQuantity: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: 'minimum_shelf_life_percent', default: 50 })
  minimumShelfLifePercent: number;

  @Column({ type: 'boolean', name: 'is_feed_grade', default: false })
  isFeedGrade: boolean;

  @Column({ type: 'uuid', name: 'sds_document_id', nullable: true })
  sdsDocumentId: string;

  @Column({ type: 'jsonb', nullable: true })
  specifications: Record<string, any>;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
