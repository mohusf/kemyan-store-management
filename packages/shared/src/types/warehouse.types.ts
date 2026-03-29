/**
 * Zone types in the Kemyan warehouse.
 * Values are simple strings matching seed data; stored as VARCHAR in the zones table.
 */
export enum ZoneType {
  RAW_MATERIAL = 'raw_material',
  FINISHED_GOODS = 'finished_goods',
  QUARANTINE = 'quarantine',
  HAZARDOUS = 'hazardous',
  COLD_STORAGE = 'cold_storage',
}

/**
 * Zone record representing a physical warehouse area.
 * Maps to the zones table.
 */
export interface Zone {
  id: string;
  code: string;
  nameEn: string;
  nameAr?: string;
  zoneType: string;
  /** JSONB array of allowed chemical compatibility group identifiers */
  allowedCompatibilityGroups: string[];
  /** JSONB describing required safety equipment for the zone */
  safetyEquipment?: Record<string, unknown>;
  maxTemperature?: number;
  maxHumidity?: number;
  isActive: boolean;
  createdAt: string;
}

/**
 * Individual addressable storage position within a zone.
 * Maps to the storage_locations table.
 */
export interface StorageLocation {
  id: string;
  /** Human-readable location code, e.g. "RM-ACID-A01-R01-B01" */
  code: string;
  nameEn?: string;
  nameAr?: string;
  zoneId?: string;
  aisle?: string;
  rack?: string;
  bin?: string;
  /** e.g. 'floor', 'rack', 'bulk', 'cold_room' */
  locationType: string;
  /** JSONB array of chemical compatibility group identifiers */
  compatibilityGroups: string[];
  maxCapacity?: number;
  currentOccupancy: number;
  temperatureMin?: number;
  temperatureMax?: number;
  humidityMax?: number;
  /** JSONB array of required PPE for this location */
  requiredPpe?: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
