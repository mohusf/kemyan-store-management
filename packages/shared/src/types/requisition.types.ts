/**
 * Multi-step approval workflow status for material requisitions.
 * The exact path depends on the requisition value and urgency.
 */
export enum RequisitionStatus {
  DRAFT = 'DRAFT',
  PENDING_SUPERVISOR = 'PENDING_SUPERVISOR',
  PENDING_STORE_MANAGER = 'PENDING_STORE_MANAGER',
  PENDING_PROCUREMENT = 'PENDING_PROCUREMENT',
  PENDING_PLANT_MANAGER = 'PENDING_PLANT_MANAGER',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export enum UrgencyLevel {
  /** Standard processing within normal SLA */
  NORMAL = 'NORMAL',
  /** Expedited processing; shorter SLA applies */
  URGENT = 'URGENT',
  /** Production-critical; requires immediate attention and escalation */
  EMERGENCY = 'EMERGENCY',
}

export enum ApprovalDecision {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  /** Sent back to the requester for clarification or amendment */
  RETURNED = 'RETURNED',
}

export interface RequisitionLineItem {
  id: string;
  materialId: string;
  requestedQuantity: number;
  issuedQuantity?: number;
  notes?: string;
}

export interface ApprovalRecord {
  id: string;
  requisitionId: string;
  approverUserId: string;
  decision: ApprovalDecision;
  comments?: string;
  decidedAt: string;
}

export interface Requisition {
  id: string;
  requisitionNumber: string;
  requestedBy: string;
  department: string;
  status: RequisitionStatus;
  urgency: UrgencyLevel;
  lineItems: RequisitionLineItem[];
  approvals: ApprovalRecord[];
  /** Estimated total value in SAR; drives the approval routing */
  estimatedValueSAR?: number;
  justification?: string;
  requiredByDate?: string;
  createdAt: string;
  updatedAt: string;
}
