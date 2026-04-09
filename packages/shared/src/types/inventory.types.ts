export enum TransactionType {
  /** Goods received into the warehouse */
  RECEIVE = 'receive',
  /** Material issued out to a department or production */
  ISSUE = 'issue',
  /** Inter-zone or inter-warehouse transfer */
  TRANSFER = 'transfer',
  /** Manual stock adjustment (cycle count correction, etc.) */
  ADJUST = 'adjust',
  /** Material returned from production or department */
  RETURN = 'return',
  /** Damaged, expired, or condemned stock removal */
  WRITE_OFF = 'write_off',
}

export enum QualityStatus {
  /** Awaiting QC inspection; material must not be used */
  QUARANTINE = 'quarantine',
  /** Passed QC inspection and cleared for use */
  APPROVED = 'approved',
  /** Failed QC inspection; pending disposition (return/destroy) */
  REJECTED = 'rejected',
  /** Past shelf-life expiry; must not be used */
  EXPIRED = 'expired',
}

/**
 * GMP+ Feed Safety Assurance status for raw materials.
 * Kemyan must segregate assured vs non-assured materials.
 */
export enum GmpPlusStatus {
  /** Sourced from a GMP+ certified supplier */
  ASSURED = 'assured',
  /** Not covered by GMP+ certification */
  NON_ASSURED = 'non_assured',
}

export interface Batch {
  id: string;
  materialId: string;
  /** Unique lot number for this batch */
  lotNumber: string;
  /** Supplier who provided this batch */
  supplierId?: string;
  /** Batch number as provided by the supplier */
  supplierBatchNumber?: string;
  /** ISO 8601 date of manufacture */
  manufactureDate?: string;
  /** ISO 8601 expiry date; used by FEFO picking logic */
  expiryDate?: string;
  /** ISO 8601 date when this batch was received */
  receivedDate?: string;
  /** Quantity originally received */
  quantityReceived: number;
  /** Quantity currently available */
  quantityAvailable: number;
  qualityStatus: QualityStatus;
  gmpPlusStatus?: GmpPlusStatus;
  /** Certificate of Analysis document ID, if attached */
  coaDocumentId?: string;
  /** Storage location where this batch is stored */
  storageLocationId?: string;
  /** Array of source batch UUIDs for finished goods traceability */
  rawMaterialBatches?: string[];
  /** Production order reference, if applicable */
  productionOrderId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryTransaction {
  id: number;
  batchId?: string;
  materialId: string;
  locationId?: string;
  transactionType: TransactionType;
  quantity: number;
  /** Type of reference document (e.g. 'purchase_order', 'requisition') */
  referenceType?: string;
  /** UUID of the reference document */
  referenceId?: string;
  performedBy: string;
  reason?: string;
  /** Running balance of the material after this transaction */
  runningBalance: number;
  createdAt: string;
}
