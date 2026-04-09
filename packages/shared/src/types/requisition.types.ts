/**
 * Multi-step approval workflow status for material requisitions.
 * Values are lowercase to match the database varchar values.
 */
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
  /** Standard processing within normal SLA */
  NORMAL = 'normal',
  HIGH = 'high',
  /** Production-critical; requires immediate attention and escalation */
  CRITICAL = 'critical',
}

export interface Requisition {
  id: string;
  requisitionNumber: string;
  requesterId: string;
  materialId: string;
  quantity: number;
  urgency: string;
  /** Estimated total value in SAR; drives the approval routing */
  estimatedValue?: number;
  status: RequisitionStatus;
  currentApproverId?: string;
  department?: string;
  justification?: string;
  /** ISO 8601 date by which the material is needed */
  requiredDate?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Approval step in the multi-level approval chain.
 * Maps to the approval_steps table.
 */
export interface ApprovalStep {
  id: string;
  requisitionId: string;
  stepOrder: number;
  approverRole: string;
  approverId?: string;
  decision?: string;
  comments?: string;
  decidedAt?: string;
  slaHours: number;
  escalated: boolean;
}
