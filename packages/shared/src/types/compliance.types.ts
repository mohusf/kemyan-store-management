/**
 * GHS pictograms as defined by the Globally Harmonized System.
 * Each code maps to a specific hazard symbol used on labels and SDS.
 */
export enum GHSPictogram {
  /** Exploding bomb - Explosives, self-reactives, organic peroxides */
  GHS01 = 'GHS01',
  /** Flame - Flammable gases/liquids/solids/aerosols, self-reactives */
  GHS02 = 'GHS02',
  /** Flame over circle - Oxidizing gases, liquids, and solids */
  GHS03 = 'GHS03',
  /** Gas cylinder - Gases under pressure */
  GHS04 = 'GHS04',
  /** Corrosion - Corrosive to metals, skin corrosion, serious eye damage */
  GHS05 = 'GHS05',
  /** Skull and crossbones - Acute toxicity (fatal or toxic) */
  GHS06 = 'GHS06',
  /** Exclamation mark - Irritant, skin sensitizer, acute toxicity (harmful), narcotic effects, respiratory tract irritation */
  GHS07 = 'GHS07',
  /** Health hazard - Carcinogenicity, mutagenicity, reproductive toxicity, respiratory sensitization, STOT, aspiration hazard */
  GHS08 = 'GHS08',
  /** Environment - Hazardous to the aquatic environment */
  GHS09 = 'GHS09',
}

export enum SignalWord {
  /** Indicates more severe hazard categories */
  DANGER = 'DANGER',
  /** Indicates less severe hazard categories */
  WARNING = 'WARNING',
}

export enum WasteType {
  HAZARDOUS_CHEMICAL = 'HAZARDOUS_CHEMICAL',
  NON_HAZARDOUS = 'NON_HAZARDOUS',
  EXPIRED_MATERIAL = 'EXPIRED_MATERIAL',
  CONTAMINATED_PACKAGING = 'CONTAMINATED_PACKAGING',
  LABORATORY_WASTE = 'LABORATORY_WASTE',
  ELECTRONIC_WASTE = 'ELECTRONIC_WASTE',
}

/**
 * Personal Protective Equipment types required for handling
 * hazardous materials at Kemyan.
 */
export enum PPEType {
  SAFETY_GOGGLES = 'SAFETY_GOGGLES',
  FACE_SHIELD = 'FACE_SHIELD',
  CHEMICAL_GLOVES = 'CHEMICAL_GLOVES',
  HEAT_RESISTANT_GLOVES = 'HEAT_RESISTANT_GLOVES',
  SAFETY_BOOTS = 'SAFETY_BOOTS',
  CHEMICAL_APRON = 'CHEMICAL_APRON',
  FULL_BODY_SUIT = 'FULL_BODY_SUIT',
  RESPIRATOR = 'RESPIRATOR',
  SCBA = 'SCBA',
  HARD_HAT = 'HARD_HAT',
  HEARING_PROTECTION = 'HEARING_PROTECTION',
}
