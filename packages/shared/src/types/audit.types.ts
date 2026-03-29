export enum AuditAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  EXPORT = 'EXPORT',
}

/**
 * Immutable audit log entry. Every state-changing operation in the system
 * produces an audit record for regulatory traceability (SFDA, GMP+).
 */
export interface AuditLog {
  id: string;
  /** The action that was performed */
  action: AuditAction;
  /** Entity type affected (e.g. "Material", "PurchaseOrder") */
  entityType: string;
  /** ID of the affected entity */
  entityId: string;
  /** User who performed the action */
  userId: string;
  /** Snapshot of changed fields: { field: { old, new } } */
  changes?: Record<string, { oldValue: unknown; newValue: unknown }>;
  /** IP address of the client */
  ipAddress?: string;
  /** Additional context or reason for the action */
  metadata?: Record<string, unknown>;
  createdAt: string;
}
