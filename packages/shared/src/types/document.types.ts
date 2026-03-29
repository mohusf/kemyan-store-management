export enum DocumentCategory {
  SOP = 'sop',
  POLICY = 'policy',
  CERTIFICATE = 'certificate',
  SDS = 'sds',
  COA = 'coa',
  REPORT = 'report',
  TRAINING = 'training',
  FORM = 'form',
  OTHER = 'other',
}

export enum DocumentStatus {
  DRAFT = 'draft',
  UNDER_REVIEW = 'under_review',
  APPROVED = 'approved',
  /** Document superseded by a newer version or no longer valid */
  OBSOLETE = 'obsolete',
}

/**
 * Controlled document with versioning and review cycle tracking.
 * Maps to the documents table.
 */
export interface Document {
  id: string;
  documentNumber: string;
  titleEn: string;
  titleAr?: string;
  category: string;
  /** Version string, e.g. "1.0", "2.1" */
  version: string;
  status: string;
  /** Storage path or object key */
  filePath?: string;
  /** File size in bytes */
  fileSizeBytes?: number;
  /** MIME type of the stored file */
  mimeType?: string;
  uploadedBy?: string;
  /** ISO 8601 date when the document becomes effective */
  effectiveDate?: string;
  /** ISO 8601 date when the document is due for review */
  reviewDate?: string;
  createdAt: string;
  updatedAt: string;
}
