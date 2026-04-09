import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'jsonb', default: [] })
  permissions: Record<string, any>[];

  @Column({ type: 'text', nullable: true, name: 'description_en' })
  descriptionEn: string;

  @Column({ type: 'text', nullable: true, name: 'description_ar' })
  descriptionAr: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
