import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ApprovalStep } from './approval-step.entity';

export enum RequisitionStatus {
  DRAFT = 'draft',
  PENDING_SUPERVISOR = 'pending_supervisor',
  PENDING_STORE_MANAGER = 'pending_store_manager',
  PENDING_PROCUREMENT = 'pending_procurement',
  PENDING_PLANT_MANAGER = 'pending_plant_manager',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}

export enum UrgencyLevel {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  CRITICAL = 'critical',
}

@Entity('requisitions')
export class Requisition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true, name: 'requisition_number' })
  requisitionNumber: string;

  @Column({ type: 'uuid', name: 'requester_id' })
  requesterId: string;

  @Column({ type: 'uuid', name: 'material_id' })
  materialId: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  quantity: number;

  @Column({ type: 'varchar', length: 20, default: UrgencyLevel.NORMAL })
  urgency: UrgencyLevel;

  @Column({ type: 'decimal', precision: 14, scale: 2, name: 'estimated_value', default: 0 })
  estimatedValue: number;

  @Column({
    type: 'varchar',
    length: 30,
    default: RequisitionStatus.DRAFT,
  })
  status: RequisitionStatus;

  @Column({ type: 'uuid', name: 'current_approver_id', nullable: true })
  currentApproverId: string;

  @Column({ type: 'varchar', length: 100 })
  department: string;

  @Column({ type: 'text', nullable: true })
  justification: string;

  @Column({ type: 'date', name: 'required_date', nullable: true })
  requiredDate: Date;

  @OneToMany(() => ApprovalStep, (step) => step.requisition)
  approvalSteps: ApprovalStep[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
