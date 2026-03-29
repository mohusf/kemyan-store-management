export enum DocumentCategory {
  /** Safety Data Sheet */
  SDS = 'SDS',
  /** Certificate of Analysis from supplier */
  COA = 'COA',
  /** Certificate of Conformance */
  COC = 'COC',
  /** Material specification sheet */
  SPECIFICATION = 'SPECIFICATION',
  /** Standard Operating Procedure */
  SOP = 'SOP',
  /** Supplier qualification document */
  SUPPLIER_QUALIFICATION = 'SUPPLIER_QUALIFICATION',
  /** GMP+ certificate */
  GMP_PLUS_CERTIFICATE = 'GMP_PLUS_CERTIFICATE',
  /** SFDA registration or license */
  SFDA_LICENSE = 'SFDA_LICENSE',
  /** Purchase order or invoice */
  PURCHASE_DOCUMENT = 'PURCHASE_DOCUMENT',
  /** Inspection or test report */
  INSPECTION_REPORT = 'INSPECTION_REPORT',
  /** Training record */
  TRAINING_RECORD = 'TRAINING_RECORD',
  /** Other / miscellaneous */
  OTHER = 'OTHER',
}

export enum DocumentStatus {
  DRAFT = 'DRAFT',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  /** Document superseded by a newer version or no longer valid */
  OBSOLETE = 'OBSOLETE',
}

export interface Document {
  id: string;
  documentNumber: string;
  title: string;
  category: DocumentCategory;
  status: DocumentStatus;
  /** Version string, e.g. "1.0", "2.1" */
  version: string;
  /** MIME type of the stored file */
  mimeType: string;
  /** File size in bytes */
  fileSizeBytes: number;
  /** Storage path or object key */
  storagePath: string;
  /** Entity this document is associated with (material, supplier, etc.) */
  linkedEntityType?: string;
  linkedEntityId?: string;
  /** ISO 8601 date when the document expires, if applicable */
  expiryDate?: string;
  uploadedBy: string;
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
}
