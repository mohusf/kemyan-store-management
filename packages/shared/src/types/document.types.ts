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

export enum DocumentDomain {
  IMS = 'IMS',
  GMP = 'GMP',
  QLY = 'QLY',
  ENV = 'ENV',
  OHS = 'OHS',
}

export enum DocumentLevel {
  L1 = 'L1',
  L2 = 'L2',
  L3 = 'L3',
  L4 = 'L4',
}

export enum DocumentTypeCode {
  PS = 'PS',
  PR = 'PR',
  WI = 'WI',
  FO = 'FO',
  LI = 'LI',
  MA = 'MA',
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
  version: string;
  status: string;
  filePath?: string;
  fileSizeBytes?: number;
  mimeType?: string;
  uploadedBy?: string;
  effectiveDate?: string;
  reviewDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMSDocument extends Document {
  parentId?: string;
  documentLevel?: string;
  typeCode?: string;
  chapter?: number;
  domain?: string;
  sortOrder?: number;
  children?: IMSDocument[];
}

export interface DocumentSection {
  id: string;
  documentId: string;
  sectionNumber: string;
  titleEn: string;
  titleAr?: string;
  contentEn?: string;
  contentAr?: string;
  sortOrder: number;
}

export interface DocumentRevision {
  id: string;
  documentId: string;
  revisionIndex: number;
  description?: string;
  revisionDate?: string;
  preparedBy?: string;
  reviewedBy?: string;
  approvedBy?: string;
}

export const DOMAIN_LABELS: Record<string, { en: string; ar: string }> = {
  IMS: { en: 'Integrated Management System', ar: 'نظام الإدارة المتكامل' },
  GMP: { en: 'Good Manufacturing Practice', ar: 'ممارسات التصنيع الجيد' },
  QLY: { en: 'Quality', ar: 'الجودة' },
  ENV: { en: 'Environment', ar: 'البيئة' },
  OHS: { en: 'Occupational Health & Safety', ar: 'الصحة والسلامة المهنية' },
};

export const TYPE_CODE_LABELS: Record<string, { en: string; ar: string }> = {
  PS: { en: 'Process Specification', ar: 'مواصفات العملية' },
  PR: { en: 'Procedure', ar: 'إجراء' },
  WI: { en: 'Work Instruction', ar: 'تعليمات العمل' },
  FO: { en: 'Form', ar: 'نموذج' },
  LI: { en: 'List/Register', ar: 'قائمة/سجل' },
  MA: { en: 'Manual', ar: 'دليل' },
};
