export enum TransactionType {
  /** Goods received into the warehouse */
  RECEIVE = 'RECEIVE',
  /** Material issued out to a department or production */
  ISSUE = 'ISSUE',
  /** Inter-zone or inter-warehouse transfer */
  TRANSFER = 'TRANSFER',
  /** Manual stock adjustment (cycle count correction, etc.) */
  ADJUST = 'ADJUST',
  /** Material returned from production or department */
  RETURN = 'RETURN',
  /** Damaged, expired, or condemned stock removal */
  WRITE_OFF = 'WRITE_OFF',
}

export enum QualityStatus {
  /** Awaiting QC inspection; material must not be used */
  QUARANTINE = 'QUARANTINE',
  /** Passed QC inspection and cleared for use */
  APPROVED = 'APPROVED',
  /** Failed QC inspection; pending disposition (return/destroy) */
  REJECTED = 'REJECTED',
  /** Approaching or past retest date; needs re-inspection */
  RETEST_REQUIRED = 'RETEST_REQUIRED',
  /** Past shelf-life expiry; must not be used */
  EXPIRED = 'EXPIRED',
}

/**
 * GMP+ Feed Safety Assurance status for raw materials.
 * Kemyan must segregate assured vs non-assured materials.
 */
export enum GmpPlusStatus {
  /** Sourced from a GMP+ certified supplier */
  ASSURED = 'ASSURED',
  /** Not covered by GMP+ certification */
  NON_ASSURED = 'NON_ASSURED',
}

export enum BatchStatus {
  ACTIVE = 'ACTIVE',
  CONSUMED = 'CONSUMED',
  EXPIRED = 'EXPIRED',
  QUARANTINED = 'QUARANTINED',
  WRITTEN_OFF = 'WRITTEN_OFF',
}

export interface Batch {
  id: string;
  materialId: string;
  /** Supplier or internal batch/lot number */
  batchNumber: string;
  quantity: number;
  qualityStatus: QualityStatus;
  gmpPlusStatus: GmpPlusStatus;
  batchStatus: BatchStatus;
  /** ISO 8601 date of manufacture */
  manufacturingDate?: string;
  /** ISO 8601 expiry date; used by FEFO picking logic */
  expiryDate?: string;
  /** ISO 8601 date when retest is due */
  retestDate?: string;
  /** Warehouse zone / location where this batch is stored */
  storageLocationId: string;
  /** GRN ID that received this batch */
  grnId?: string;
  /** Certificate of Analysis document ID, if attached */
  coaDocumentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryTransaction {
  id: string;
  transactionType: TransactionType;
  materialId: string;
  batchId?: string;
  quantity: number;
  /** Location the material was moved from (for TRANSFER, ISSUE) */
  fromLocationId?: string;
  /** Location the material was moved to (for TRANSFER, RECEIVE) */
  toLocationId?: string;
  /** Reference document (PO number, requisition ID, etc.) */
  referenceId?: string;
  referenceType?: string;
  reason?: string;
  performedBy: string;
  createdAt: string;
}
