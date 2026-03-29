export enum QualificationStatus {
  /** New supplier, not yet evaluated */
  PENDING = 'PENDING',
  /** Passed evaluation and approved for purchasing */
  QUALIFIED = 'QUALIFIED',
  /** Conditionally approved with restrictions or follow-up actions */
  CONDITIONALLY_APPROVED = 'CONDITIONALLY_APPROVED',
  /** Failed evaluation or disqualified due to performance */
  DISQUALIFIED = 'DISQUALIFIED',
  /** Qualification has lapsed and requires renewal */
  EXPIRED = 'EXPIRED',
}

export interface SupplierEvaluation {
  id: string;
  supplierId: string;
  evaluationDate: string;
  /** Overall score out of 100 */
  overallScore: number;
  qualityScore: number;
  deliveryScore: number;
  priceScore: number;
  complianceScore: number;
  evaluatedBy: string;
  comments?: string;
  /** Resulting qualification decision */
  qualificationDecision: QualificationStatus;
  nextEvaluationDate: string;
}

export interface Supplier {
  id: string;
  supplierCode: string;
  name: string;
  nameAr?: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  qualificationStatus: QualificationStatus;
  /** Whether this supplier holds GMP+ certification */
  gmpPlusCertified: boolean;
  gmpPlusCertificateExpiry?: string;
  /** VAT registration number (required in KSA) */
  vatNumber?: string;
  /** Commercial Registration number */
  crNumber?: string;
  /** Material categories this supplier is approved to provide */
  approvedCategories: string[];
  latestEvaluation?: SupplierEvaluation;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
