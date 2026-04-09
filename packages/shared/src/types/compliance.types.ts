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

export enum WasteType {
  HAZARDOUS = 'hazardous',
  NON_HAZARDOUS = 'non_hazardous',
  RECYCLABLE = 'recyclable',
  CHEMICAL = 'chemical',
}

/**
 * Personal Protective Equipment types required for handling
 * hazardous materials at Kemyan.
 */
export enum PPEType {
  GLOVES = 'gloves',
  GOGGLES = 'goggles',
  FACE_SHIELD = 'face_shield',
  RESPIRATOR = 'respirator',
  CHEMICAL_SUIT = 'chemical_suit',
  SAFETY_BOOTS = 'safety_boots',
  HARD_HAT = 'hard_hat',
}
