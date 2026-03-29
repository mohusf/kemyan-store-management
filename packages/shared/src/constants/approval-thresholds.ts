/**
 * Requisition value thresholds (in SAR) that determine the approval path.
 * Values at or below a limit can be approved by the corresponding role.
 */
export const APPROVAL_THRESHOLDS = {
  /** Supervisor can approve requisitions up to this SAR value */
  SUPERVISOR_LIMIT: 2_000,
  /** Store Manager can approve requisitions up to this SAR value */
  STORE_MANAGER_LIMIT: 10_000,
  /** Values above STORE_MANAGER_LIMIT require Plant Manager approval */
} as const;

/**
 * SLA (Service Level Agreement) targets in hours for each urgency level.
 * Measured from requisition submission to final approval decision.
 */
export const APPROVAL_SLA_HOURS = {
  NORMAL: 48,
  URGENT: 8,
  EMERGENCY: 2,
} as const;

/**
 * Maximum time in hours for each individual approval step.
 */
export const STEP_SLA_HOURS = {
  SUPERVISOR: 24,
  STORE_MANAGER: 24,
  PROCUREMENT: 24,
  PLANT_MANAGER: 24,
  /** Escalation is triggered after this many hours without a decision */
  ESCALATION_THRESHOLD: 12,
} as const;
