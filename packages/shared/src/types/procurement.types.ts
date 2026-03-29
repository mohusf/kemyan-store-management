export enum POStatus {
  DRAFT = 'DRAFT',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  SENT_TO_SUPPLIER = 'SENT_TO_SUPPLIER',
  PARTIALLY_RECEIVED = 'PARTIALLY_RECEIVED',
  FULLY_RECEIVED = 'FULLY_RECEIVED',
  CANCELLED = 'CANCELLED',
}

export enum GRNStatus {
  /** GRN created, goods pending QC inspection */
  PENDING_INSPECTION = 'PENDING_INSPECTION',
  /** QC passed, goods accepted into inventory */
  ACCEPTED = 'ACCEPTED',
  /** QC failed or goods damaged, pending return to supplier */
  REJECTED = 'REJECTED',
  /** Partially accepted (split batch) */
  PARTIALLY_ACCEPTED = 'PARTIALLY_ACCEPTED',
}

export enum Currency {
  /** Saudi Riyal */
  SAR = 'SAR',
  /** US Dollar */
  USD = 'USD',
  /** Euro */
  EUR = 'EUR',
}

export interface PurchaseOrderLineItem {
  id: string;
  materialId: string;
  quantity: number;
  unitPrice: number;
  currency: Currency;
  receivedQuantity: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  status: POStatus;
  lineItems: PurchaseOrderLineItem[];
  currency: Currency;
  /** Total value before VAT */
  subtotal: number;
  vatAmount: number;
  totalAmount: number;
  /** Linked requisition IDs that triggered this PO */
  requisitionIds: string[];
  expectedDeliveryDate?: string;
  notes?: string;
  createdBy: string;
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GoodsReceivedNote {
  id: string;
  grnNumber: string;
  purchaseOrderId: string;
  supplierId: string;
  status: GRNStatus;
  receivedBy: string;
  receivedAt: string;
  lineItems: GRNLineItem[];
  /** Whether supplier delivery vehicle was inspected */
  vehicleInspected: boolean;
  deliveryNoteReference?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GRNLineItem {
  id: string;
  poLineItemId: string;
  materialId: string;
  receivedQuantity: number;
  acceptedQuantity: number;
  rejectedQuantity: number;
  batchNumber: string;
  manufacturingDate?: string;
  expiryDate?: string;
  /** Certificate of Analysis attached */
  coaAttached: boolean;
}
