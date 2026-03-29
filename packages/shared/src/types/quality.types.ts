export enum InspectionResult {
  /** Material fully meets specifications */
  PASS = 'pass',
  /** Material does not meet specifications */
  FAIL = 'fail',
  /** Accepted with deviations or use restrictions */
  CONDITIONAL = 'conditional',
}

export enum NCRSeverity {
  /** Minor deviation with no significant impact */
  MINOR = 'minor',
  /** Significant deviation requiring corrective action */
  MAJOR = 'major',
  /** Severe deviation posing safety, regulatory, or quality risk */
  CRITICAL = 'critical',
}

export enum NCRStatus {
  OPEN = 'open',
  INVESTIGATING = 'investigating',
  CORRECTIVE_ACTION = 'corrective_action',
  VERIFICATION = 'verification',
  CLOSED = 'closed',
}

export interface InspectionRecord {
  id: string;
  batchId: string;
  inspectionType: string;
  inspectorId: string;
  result: InspectionResult;
  /** JSONB parameters tested and their outcomes */
  parameters?: Record<string, unknown>;
  /** Certificate of Analysis document reference */
  coaDocumentId?: string;
  inspectedAt: string;
  notes?: string;
}

/**
 * Non-Conformance Report raised when material or process
 * deviates from specifications or procedures.
 */
export interface NonConformanceReport {
  id: string;
  ncrNumber: string;
  title: string;
  description?: string;
  source?: string;
  severity: NCRSeverity;
  batchId?: string;
  materialId?: string;
  status: NCRStatus;
  assignedTo?: string;
  rootCause?: string;
  correctiveAction?: string;
  preventiveAction?: string;
  dueDate?: string;
  createdBy?: string;
  createdAt: string;
  closedAt?: string;
  updatedAt: string;
}
