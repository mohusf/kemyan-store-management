import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum DocumentStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  UNDER_REVIEW = 'under_review',
  SUPERSEDED = 'superseded',
  ARCHIVED = 'archived',
}

export enum DocumentCategory {
  SDS = 'sds',
  COA = 'coa',
  PROCEDURE = 'procedure',
  POLICY = 'policy',
  FORM = 'form',
  CERTIFICATE = 'certificate',
  REPORT = 'report',
  OTHER = 'other',
}

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true, name: 'document_number' })
  documentNumber: string;

  @Column({ type: 'varchar', length: 500, name: 'title_ar' })
  titleAr: string;

  @Column({ type: 'varchar', length: 500, name: 'title_en' })
  titleEn: string;

  @Column({ type: 'enum', enum: DocumentCategory })
  category: DocumentCategory;

  @Column({ type: 'varchar', length: 20 })
  version: string;

  @Column({
    type: 'enum',
    enum: DocumentStatus,
    default: DocumentStatus.DRAFT,
  })
  status: DocumentStatus;

  @Column({ type: 'varchar', length: 1000, name: 'file_path' })
  filePath: string;

  @Column({ type: 'uuid', name: 'uploaded_by' })
  uploadedBy: string;

  @Column({ type: 'date', name: 'effective_date', nullable: true })
  effectiveDate: Date;

  @Column({ type: 'date', name: 'review_date', nullable: true })
  reviewDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
