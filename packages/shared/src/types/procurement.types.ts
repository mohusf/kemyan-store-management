export enum POStatus {
  DRAFT = 'draft',
  PENDING_APPROVAL = 'pending_approval',
  APPROVED = 'approved',
  SENT = 'sent',
  PARTIALLY_RECEIVED = 'partially_received',
  FULLY_RECEIVED = 'fully_received',
  CANCELLED = 'cancelled',
}

export enum GRNStatus {
  /** GRN created, goods pending inspection */
  PENDING = 'pending',
  /** Inspection passed */
  PASSED = 'passed',
  /** Inspection failed */
  FAILED = 'failed',
  /** Partially accepted */
  PARTIAL = 'partial',
}

export interface PurchaseOrderLine {
  id: string;
  purchaseOrderId: string;
  materialId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  receivedQuantity: number;
  notes?: string;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  status: POStatus;
  totalAmount?: number;
  vatAmount?: number;
  currency: string;
  /** ZATCA e-invoicing reference */
  zatcaInvoiceId?: string;
  notes?: string;
  createdBy?: string;
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GoodsReceivedNote {
  id: string;
  grnNumber: string;
  purchaseOrderId?: string;
  receivedBy: string;
  receivedAt: string;
  inspectionStatus: string;
  notes?: string;
  createdAt: string;
}

/**
 * Line-level detail for each GRN, linking to PO lines and creating batches.
 * Maps to the grn_lines table.
 */
export interface GRNLine {
  id: string;
  grnId: string;
  poLineId?: string;
  materialId: string;
  batchId?: string;
  quantityReceived: number;
  quantityAccepted?: number;
  quantityRejected: number;
  rejectionReason?: string;
}
