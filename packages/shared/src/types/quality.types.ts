export enum InspectionResult {
  /** Material fully meets specifications */
  PASS = 'PASS',
  /** Material does not meet specifications */
  FAIL = 'FAIL',
  /** Accepted with deviations or use restrictions */
  CONDITIONAL = 'CONDITIONAL',
}

export enum NCRSeverity {
  /** Minor deviation with no significant impact */
  MINOR = 'MINOR',
  /** Significant deviation requiring corrective action */
  MAJOR = 'MAJOR',
  /** Severe deviation posing safety, regulatory, or quality risk */
  CRITICAL = 'CRITICAL',
}

export enum NCRStatus {
  OPEN = 'OPEN',
  UNDER_INVESTIGATION = 'UNDER_INVESTIGATION',
  PENDING_DISPOSITION = 'PENDING_DISPOSITION',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export enum CAPAStatus {
  /** CAPA identified but not yet planned */
  OPEN = 'OPEN',
  /** Action plan defined and in progress */
  IN_PROGRESS = 'IN_PROGRESS',
  /** Actions completed, pending effectiveness verification */
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  /** Effectiveness confirmed; CAPA closed */
  CLOSED = 'CLOSED',
  /** CAPA was not effective; requires re-opening */
  INEFFECTIVE = 'INEFFECTIVE',
}

export interface InspectionRecord {
  id: string;
  grnId: string;
  materialId: string;
  batchId: string;
  inspectedBy: string;
  inspectionDate: string;
  result: InspectionResult;
  /** Spec parameters tested and their outcomes */
  testResults: TestParameter[];
  comments?: string;
  coaVerified: boolean;
  createdAt: string;
}

export interface TestParameter {
  parameterName: string;
  specification: string;
  actualValue: string;
  passed: boolean;
}

/**
 * Non-Conformance Report raised when material or process
 * deviates from specifications or procedures.
 */
export interface NonConformanceReport {
  id: string;
  ncrNumber: string;
  severity: NCRSeverity;
  status: NCRStatus;
  materialId?: string;
  batchId?: string;
  supplierId?: string;
  description: string;
  rootCause?: string;
  disposition?: string;
  raisedBy: string;
  raisedAt: string;
  closedAt?: string;
  linkedCAPAIds: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Corrective and Preventive Action linked to an NCR.
 */
export interface CAPA {
  id: string;
  capaNumber: string;
  ncrId: string;
  status: CAPAStatus;
  type: 'CORRECTIVE' | 'PREVENTIVE';
  description: string;
  assignedTo: string;
  dueDate: string;
  completedAt?: string;
  verifiedBy?: string;
  verifiedAt?: string;
  effectivenessNotes?: string;
  createdAt: string;
  updatedAt: string;
}
