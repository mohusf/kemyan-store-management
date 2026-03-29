import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('material_categories')
export class MaterialCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, name: 'name_ar' })
  nameAr: string;

  @Column({ type: 'varchar', length: 255, name: 'name_en' })
  nameEn: string;

  @Column({ type: 'uuid', name: 'parent_id', nullable: true })
  parentId: string;

  @ManyToOne(() => MaterialCategory, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: MaterialCategory;

  @Column({ type: 'boolean', name: 'requires_quality_approval', default: false })
  requiresQualityApproval: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
