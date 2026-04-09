import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum NcrSource {
  INCOMING_INSPECTION = 'incoming_inspection',
  IN_PROCESS = 'in_process',
  CUSTOMER_COMPLAINT = 'customer_complaint',
  AUDIT = 'audit',
  INTERNAL = 'internal',
}

export enum NcrSeverity {
  MINOR = 'minor',
  MAJOR = 'major',
  CRITICAL = 'critical',
}

export enum NcrStatus {
  OPEN = 'open',
  INVESTIGATING = 'investigating',
  CORRECTIVE_ACTION = 'corrective_action',
  VERIFICATION = 'verification',
  CLOSED = 'closed',
}

@Entity('non_conformance_reports')
export class Ncr {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true, name: 'ncr_number' })
  ncrNumber: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 30 })
  source: string;

  @Column({ type: 'varchar', length: 20 })
  severity: string;

  @Column({ type: 'uuid', name: 'batch_id', nullable: true })
  batchId: string;

  @Column({ type: 'uuid', name: 'material_id', nullable: true })
  materialId: string;

  @Column({ type: 'varchar', length: 30, default: NcrStatus.OPEN })
  status: string;

  @Column({ type: 'uuid', name: 'assigned_to', nullable: true })
  assignedTo: string;

  @Column({ type: 'text', name: 'root_cause', nullable: true })
  rootCause: string;

  @Column({ type: 'text', name: 'corrective_action', nullable: true })
  correctiveAction: string;

  @Column({ type: 'text', name: 'preventive_action', nullable: true })
  preventiveAction: string;

  @Column({ type: 'date', name: 'due_date', nullable: true })
  dueDate: Date;

  @Column({ type: 'uuid', name: 'created_by', nullable: true })
  createdBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'timestamp', name: 'closed_at', nullable: true })
  closedAt: Date;
}
