export enum UserRole {
  /** Field technician responsible for equipment maintenance and repairs */
  MAINTENANCE_TECHNICIAN = 'MAINTENANCE_TECHNICIAN',
  /** Operator on the production floor who consumes raw materials */
  PRODUCTION_OPERATOR = 'PRODUCTION_OPERATOR',
  /** Shift or department supervisor who approves low-value requisitions */
  SUPERVISOR = 'SUPERVISOR',
  /** Store personnel handling day-to-day inventory operations */
  STORE_KEEPER = 'STORE_KEEPER',
  /** Manager overseeing the entire store/warehouse operation */
  STORE_MANAGER = 'STORE_MANAGER',
  /** Responsible for QC inspections, NCRs, and release decisions */
  QUALITY_MANAGER = 'QUALITY_MANAGER',
  /** Handles purchase orders and supplier communication */
  PROCUREMENT_OFFICER = 'PROCUREMENT_OFFICER',
  /** Approves high-value purchases and manages procurement strategy */
  PROCUREMENT_MANAGER = 'PROCUREMENT_MANAGER',
  /** Senior authority with final approval on high-value requisitions */
  PLANT_MANAGER = 'PLANT_MANAGER',
  /** Full system access for configuration and user management */
  SYSTEM_ADMIN = 'SYSTEM_ADMIN',
}

export interface User {
  id: string;
  email: string;
  nameEn: string;
  nameAr?: string;
  roleId?: string;
  department?: string;
  isActive: boolean;
  /** ISO 8601 date-time of last successful login */
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}
