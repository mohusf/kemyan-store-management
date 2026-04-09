import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Document } from './document.entity';

@Entity('document_sections')
export class DocumentSection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'document_id' })
  documentId: string;

  @Column({ type: 'varchar', length: 20, name: 'section_number' })
  sectionNumber: string;

  @Column({ type: 'varchar', length: 500, name: 'title_en' })
  titleEn: string;

  @Column({ type: 'varchar', length: 500, name: 'title_ar', nullable: true })
  titleAr: string;

  @Column({ type: 'text', name: 'content_en', nullable: true })
  contentEn: string;

  @Column({ type: 'text', name: 'content_ar', nullable: true })
  contentAr: string;

  @Column({ type: 'int', name: 'sort_order', default: 0 })
  sortOrder: number;

  @ManyToOne(() => Document, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'document_id' })
  document: Document;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
