import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
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

@Entity('ncrs')
export class Ncr {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: NcrSource })
  source: NcrSource;

  @Column({ type: 'enum', enum: NcrSeverity })
  severity: NcrSeverity;

  @Column({ type: 'uuid', name: 'batch_id', nullable: true })
  batchId: string;

  @Column({ type: 'enum', enum: NcrStatus, default: NcrStatus.OPEN })
  status: NcrStatus;

  @Column({ type: 'uuid', name: 'assigned_to', nullable: true })
  assignedTo: string;

  @Column({ type: 'text', name: 'root_cause', nullable: true })
  rootCause: string;

  @Column({ type: 'text', name: 'corrective_action', nullable: true })
  correctiveAction: string;

  @Column({ type: 'text', name: 'preventive_action', nullable: true })
  preventiveAction: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'closed_at', nullable: true })
  closedAt: Date;
}
