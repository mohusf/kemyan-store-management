import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Requisition } from './requisition.entity';

export enum ApprovalDecision {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  RETURNED = 'returned',
}

@Entity('approval_steps')
export class ApprovalStep {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'requisition_id' })
  requisitionId: string;

  @ManyToOne(() => Requisition, (req) => req.approvalSteps)
  @JoinColumn({ name: 'requisition_id' })
  requisition: Requisition;

  @Column({ type: 'int', name: 'step_order' })
  stepOrder: number;

  @Column({ type: 'varchar', length: 100, name: 'approver_role' })
  approverRole: string;

  @Column({ type: 'uuid', name: 'approver_id', nullable: true })
  approverId: string;

  @Column({
    type: 'enum',
    enum: ApprovalDecision,
    default: ApprovalDecision.PENDING,
  })
  decision: ApprovalDecision;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @Column({ type: 'timestamp', name: 'decided_at', nullable: true })
  decidedAt: Date;
}
