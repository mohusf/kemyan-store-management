export enum QualificationStatus {
  /** New supplier, not yet evaluated */
  PENDING = 'pending',
  /** Passed evaluation and approved for purchasing */
  QUALIFIED = 'qualified',
  /** Conditionally approved with restrictions or follow-up actions */
  CONDITIONAL = 'conditional',
  /** Failed evaluation or disqualified due to performance */
  DISQUALIFIED = 'disqualified',
}

export interface Supplier {
  id: string;
  code: string;
  nameEn: string;
  nameAr?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  country?: string;
  /** GMP+ B2/B3 certificate number */
  gmpPlusCertNumber?: string;
  /** ISO 8601 date when GMP+ certificate expires */
  gmpPlusCertExpiry?: string;
  /** FAMI-QS certificate number */
  famiqsCertNumber?: string;
  /** ISO 8601 date when FAMI-QS certificate expires */
  famiqsCertExpiry?: string;
  qualificationStatus: QualificationStatus;
  /** Overall performance score from latest evaluation (0-100) */
  performanceScore?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SupplierEvaluation {
  id: string;
  supplierId: string;
  /** ISO 8601 date of the evaluation */
  evaluationDate: string;
  onTimeDeliveryScore?: number;
  qualityScore?: number;
  priceStabilityScore?: number;
  overallScore?: number;
  evaluatedBy?: string;
  notes?: string;
  createdAt: string;
}
