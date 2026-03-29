export enum MaterialCategory {
  RAW_MATERIAL = 'RAW_MATERIAL',
  PACKAGING_MATERIAL = 'PACKAGING_MATERIAL',
  FINISHED_GOOD = 'FINISHED_GOOD',
  SPARE_PART = 'SPARE_PART',
  CONSUMABLE = 'CONSUMABLE',
  CHEMICAL = 'CHEMICAL',
  LABORATORY_REAGENT = 'LABORATORY_REAGENT',
}

export enum UnitOfMeasure {
  KG = 'KG',
  G = 'G',
  L = 'L',
  ML = 'ML',
  MT = 'MT',
  PIECE = 'PIECE',
  DRUM = 'DRUM',
  BAG = 'BAG',
  PALLET = 'PALLET',
  BOX = 'BOX',
  ROLL = 'ROLL',
}

/**
 * GHS pictogram codes per the Globally Harmonized System
 * of Classification and Labelling of Chemicals.
 */
export enum GHSPictogramCode {
  /** Exploding bomb - Explosives */
  GHS01 = 'GHS01',
  /** Flame - Flammables */
  GHS02 = 'GHS02',
  /** Flame over circle - Oxidizers */
  GHS03 = 'GHS03',
  /** Gas cylinder - Compressed gases */
  GHS04 = 'GHS04',
  /** Corrosion - Corrosives */
  GHS05 = 'GHS05',
  /** Skull and crossbones - Acute toxicity (severe) */
  GHS06 = 'GHS06',
  /** Exclamation mark - Irritant / acute toxicity (harmful) */
  GHS07 = 'GHS07',
  /** Health hazard - Serious health hazard (CMR, STOT, aspiration) */
  GHS08 = 'GHS08',
  /** Environment - Aquatic toxicity */
  GHS09 = 'GHS09',
}

/**
 * Globally Harmonized System classification data attached to a material.
 * Required for all chemicals handled at Kemyan.
 */
export interface GHSClassification {
  /** GHS signal word indicating the relative severity of hazard */
  signalWord: 'DANGER' | 'WARNING' | null;
  /** Applicable GHS pictogram codes for labelling */
  pictograms: GHSPictogramCode[];
  /**
   * Hazard statements (H-codes) describing the nature and degree of hazard.
   * Example: "H225 - Highly flammable liquid and vapour"
   */
  hStatements: string[];
  /**
   * Precautionary statements (P-codes) describing recommended measures.
   * Example: "P210 - Keep away from heat, hot surfaces, sparks, open flames"
   */
  pStatements: string[];
}

export interface Material {
  id: string;
  /** Internal material code, e.g. "RM-ACID-001" */
  materialCode: string;
  name: string;
  nameAr?: string;
  description?: string;
  category: MaterialCategory;
  unitOfMeasure: UnitOfMeasure;
  /** Minimum stock level that triggers a reorder alert */
  reorderPoint: number;
  /** Maximum allowed stock level */
  maxStockLevel: number;
  /** GHS data; required when category is CHEMICAL or LABORATORY_REAGENT */
  ghsClassification?: GHSClassification;
  /** Shelf life in days from date of manufacture, if applicable */
  shelfLifeDays?: number;
  /** Whether this material requires GMP+ assured sourcing */
  gmpPlusRequired: boolean;
  /** CRC compatibility group ID for chemical segregation rules */
  compatibilityGroupId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
