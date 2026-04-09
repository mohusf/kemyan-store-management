import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Document } from './document.entity';

@Entity('document_revisions')
export class DocumentRevision {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'document_id' })
  documentId: string;

  @Column({ type: 'int', name: 'revision_index' })
  revisionIndex: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'date', name: 'revision_date', nullable: true })
  revisionDate: string | Date;

  @Column({ type: 'varchar', length: 200, name: 'prepared_by', nullable: true })
  preparedBy: string;

  @Column({ type: 'varchar', length: 200, name: 'reviewed_by', nullable: true })
  reviewedBy: string;

  @Column({ type: 'varchar', length: 200, name: 'approved_by', nullable: true })
  approvedBy: string;

  @ManyToOne(() => Document, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'document_id' })
  document: Document;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
