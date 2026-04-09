/**
 * Immutable audit log entry with SHA-256 hash chaining for tamper detection.
 * Maps to the audit_logs table. Append-only; UPDATE and DELETE are blocked.
 */
export interface AuditLog {
  id: number;
  /** Entity type affected (e.g. "Material", "PurchaseOrder") */
  entityType: string;
  /** ID of the affected entity */
  entityId: string;
  /** The action that was performed (e.g. "create", "update", "delete") */
  action: string;
  /** JSONB snapshot of the entity before the change */
  previousData?: Record<string, unknown>;
  /** JSONB snapshot of the entity after the change */
  newData?: Record<string, unknown>;
  /** User who performed the action */
  performedBy?: string;
  /** IP address of the client */
  ipAddress?: string;
  /** User agent string of the client */
  userAgent?: string;
  /** SHA-256 hash chain value for tamper detection */
  hashChain?: string;
  createdAt: string;
}
