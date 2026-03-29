import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('certificates_of_analysis')
export class Coa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'batch_id' })
  batchId: string;

  @Column({ type: 'uuid', name: 'supplier_id', nullable: true })
  supplierId: string;

  @Column({ type: 'varchar', length: 500, name: 'document_url' })
  documentUrl: string;

  @Column({ type: 'jsonb', nullable: true })
  parameters: Record<string, any>;

  @Column({ type: 'timestamp', name: 'issued_at' })
  issuedAt: Date;

  @Column({ type: 'uuid', name: 'verified_by', nullable: true })
  verifiedBy: string;

  @Column({ type: 'timestamp', name: 'verified_at', nullable: true })
  verifiedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
