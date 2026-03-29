/**
 * Saudi Arabia VAT rate (15%) as mandated by ZATCA (Zakat, Tax and Customs Authority).
 */
export const VAT_RATE = 0.15;

/**
 * SFDA (Saudi Food and Drug Authority) regulatory constants.
 * Applicable when materials are used in food, feed, or pharmaceutical production.
 */
export const SFDA = {
  /** Maximum days to retain batch traceability records */
  RECORD_RETENTION_YEARS: 5,
  /** SFDA product notification is required for these material categories */
  NOTIFICATION_REQUIRED_CATEGORIES: [
    'RAW_MATERIAL',
    'CHEMICAL',
    'PACKAGING',
  ] as const,
  /** Maximum hours allowed for product recall notification to SFDA */
  RECALL_NOTIFICATION_HOURS: 24,
} as const;

/**
 * GMP+ Feed Safety Assurance constants.
 * GMP+ B2 (Production of Feed Ingredients) and B3 (Trade, Collection & Storage)
 * requirements for feed-grade materials.
 */
export const GMP_PLUS = {
  /** Maximum hours to complete a full traceability trace (one-up, one-down) */
  TRACE_TIME_LIMIT_HOURS: 4,
  /** Traceability must cover one step back and one step forward in the chain */
  TRACEABILITY_SCOPE: 'ONE_UP_ONE_DOWN' as const,
  /** Minimum supplier audit frequency in months for GMP+ assured suppliers */
  SUPPLIER_AUDIT_FREQUENCY_MONTHS: 12,
  /** GMP+ certified materials must be physically segregated from non-assured */
  SEGREGATION_REQUIRED: true,
} as const;

/**
 * FEFO (First Expired, First Out) rules for batch issuance.
 * Chemical materials must be issued based on expiry date, not receipt date.
 */
export const FEFO = {
  /** Issue batches with the earliest expiry date first */
  STRATEGY: 'FIRST_EXPIRED_FIRST_OUT' as const,
  /** Warn when batch is within this many days of expiry */
  EXPIRY_WARNING_DAYS: 30,
  /** Block issuance when batch is within this many days of expiry */
  EXPIRY_BLOCK_DAYS: 0,
  /** Warn when batch is within this many days of retest date */
  RETEST_WARNING_DAYS: 14,
} as const;

/**
 * Saudi environmental compliance constants for chemical waste disposal.
 */
export const ENVIRONMENTAL = {
  /** Maximum days hazardous waste can be stored on-site before disposal */
  HAZARDOUS_WASTE_STORAGE_DAYS: 90,
  /** Waste manifest is required for quantities above this threshold (kg) */
  MANIFEST_THRESHOLD_KG: 25,
} as const;
