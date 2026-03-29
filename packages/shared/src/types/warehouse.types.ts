/**
 * Physical zone types in the Kemyan warehouse.
 * Zones enforce chemical segregation and storage rules.
 */
export enum ZoneType {
  /** Raw material storage - Acids */
  RM_ACID = 'RM_ACID',
  /** Raw material storage - Calcium-based materials */
  RM_CALCIUM = 'RM_CALCIUM',
  /** Raw material storage - Bases / alkalis */
  RM_BASE = 'RM_BASE',
  /** Raw material storage - General (non-hazardous) */
  RM_GENERAL = 'RM_GENERAL',
  /** Finished goods storage */
  FG = 'FG',
  /** Quality control hold / quarantine area */
  QC_HOLD = 'QC_HOLD',
  /** Waste storage area (hazardous and non-hazardous) */
  WASTE = 'WASTE',
  /** Spare parts and maintenance materials */
  SPARE_PARTS = 'SPARE_PARTS',
}

export enum LocationType {
  /** Floor-level pallet position */
  FLOOR = 'FLOOR',
  /** Rack position with row/level/bay coordinates */
  RACK = 'RACK',
  /** Bulk storage area (outdoor or large bay) */
  BULK = 'BULK',
  /** Temperature-controlled cold room */
  COLD_ROOM = 'COLD_ROOM',
  /** Dedicated hazmat containment area with spill bunding */
  HAZMAT_CONTAINMENT = 'HAZMAT_CONTAINMENT',
}

export interface StorageLocation {
  id: string;
  /** Human-readable location code, e.g. "RM-ACID-R01-L02-B03" */
  locationCode: string;
  zoneType: ZoneType;
  locationType: LocationType;
  /** Aisle or row identifier */
  aisle?: string;
  /** Rack level (vertical position) */
  level?: string;
  /** Bay or position number */
  bay?: string;
  /** Maximum weight capacity in kg */
  capacityKg?: number;
  /** Whether the location is currently occupied */
  isOccupied: boolean;
  /** Temperature range limits if applicable */
  minTemperatureC?: number;
  maxTemperatureC?: number;
  /** CRC compatibility group IDs allowed in this location */
  allowedCompatibilityGroups?: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
