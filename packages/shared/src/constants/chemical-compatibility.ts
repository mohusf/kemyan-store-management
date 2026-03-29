/**
 * Chemical Reactivity Chart (CRC) compatibility groups.
 * Based on standard chemical segregation guidelines for warehouse storage.
 * Materials within the same group are compatible; cross-group compatibility
 * must be checked against the incompatibility matrix.
 */
export const COMPATIBILITY_GROUPS = {
  GROUP_1: { id: 'GROUP_1', label: 'Acids, Mineral, Non-Oxidizing' },
  GROUP_2: { id: 'GROUP_2', label: 'Acids, Mineral, Oxidizing' },
  GROUP_3: { id: 'GROUP_3', label: 'Acids, Organic, Non-Oxidizing' },
  GROUP_4: { id: 'GROUP_4', label: 'Acids, Organic, Oxidizing' },
  GROUP_5: { id: 'GROUP_5', label: 'Alcohols and Glycols' },
  GROUP_6: { id: 'GROUP_6', label: 'Aldehydes' },
  GROUP_7: { id: 'GROUP_7', label: 'Amides' },
  GROUP_8: { id: 'GROUP_8', label: 'Amines, Aliphatic and Aromatic' },
  GROUP_9: { id: 'GROUP_9', label: 'Azo Compounds, Diazo, Hydrazines' },
  GROUP_10: { id: 'GROUP_10', label: 'Carbamates' },
  GROUP_11: { id: 'GROUP_11', label: 'Caustics (Bases)' },
  GROUP_12: { id: 'GROUP_12', label: 'Cyanides' },
  GROUP_13: { id: 'GROUP_13', label: 'Dithiocarbamates' },
  GROUP_14: { id: 'GROUP_14', label: 'Esters' },
  GROUP_15: { id: 'GROUP_15', label: 'Ethers' },
  GROUP_16: { id: 'GROUP_16', label: 'Fluorides, Inorganic' },
  GROUP_17: { id: 'GROUP_17', label: 'Hydrocarbons, Aromatic' },
  GROUP_18: { id: 'GROUP_18', label: 'Isocyanates' },
  GROUP_19: { id: 'GROUP_19', label: 'Ketones' },
  GROUP_20: { id: 'GROUP_20', label: 'Mercaptans and Sulfides' },
  GROUP_21: { id: 'GROUP_21', label: 'Metals, Alkali and Alkaline Earth' },
  GROUP_22: { id: 'GROUP_22', label: 'Nitrides' },
  GROUP_23: { id: 'GROUP_23', label: 'Peroxides and Hydroperoxides' },
} as const;

/**
 * Incompatibility matrix: maps each group ID to an array of group IDs
 * it must NOT be stored adjacent to. This is a symmetric relationship.
 *
 * Key reactions of concern:
 * - Acids + Bases = violent exothermic reaction
 * - Acids + Cyanides = HCN gas release
 * - Oxidizing acids + Flammables = fire/explosion risk
 * - Alkali metals + Water/Acids = hydrogen gas, fire risk
 */
export const INCOMPATIBILITY_MATRIX: Record<string, string[]> = {
  GROUP_1: ['GROUP_2', 'GROUP_8', 'GROUP_9', 'GROUP_11', 'GROUP_12', 'GROUP_16', 'GROUP_21', 'GROUP_23'],
  GROUP_2: ['GROUP_1', 'GROUP_3', 'GROUP_5', 'GROUP_6', 'GROUP_8', 'GROUP_9', 'GROUP_11', 'GROUP_12', 'GROUP_15', 'GROUP_17', 'GROUP_20', 'GROUP_21', 'GROUP_23'],
  GROUP_3: ['GROUP_2', 'GROUP_8', 'GROUP_11', 'GROUP_12', 'GROUP_21'],
  GROUP_4: ['GROUP_5', 'GROUP_6', 'GROUP_8', 'GROUP_9', 'GROUP_11', 'GROUP_12', 'GROUP_17', 'GROUP_20', 'GROUP_21', 'GROUP_23'],
  GROUP_5: ['GROUP_2', 'GROUP_4', 'GROUP_21', 'GROUP_23'],
  GROUP_6: ['GROUP_2', 'GROUP_4', 'GROUP_11', 'GROUP_21', 'GROUP_23'],
  GROUP_7: ['GROUP_21'],
  GROUP_8: ['GROUP_1', 'GROUP_2', 'GROUP_3', 'GROUP_4', 'GROUP_18', 'GROUP_21'],
  GROUP_9: ['GROUP_1', 'GROUP_2', 'GROUP_4', 'GROUP_21', 'GROUP_23'],
  GROUP_10: ['GROUP_21'],
  GROUP_11: ['GROUP_1', 'GROUP_2', 'GROUP_3', 'GROUP_4', 'GROUP_6', 'GROUP_16', 'GROUP_18', 'GROUP_21'],
  GROUP_12: ['GROUP_1', 'GROUP_2', 'GROUP_3', 'GROUP_4', 'GROUP_21'],
  GROUP_13: ['GROUP_21'],
  GROUP_14: ['GROUP_21'],
  GROUP_15: ['GROUP_2', 'GROUP_21'],
  GROUP_16: ['GROUP_1', 'GROUP_11', 'GROUP_21'],
  GROUP_17: ['GROUP_2', 'GROUP_4', 'GROUP_21', 'GROUP_23'],
  GROUP_18: ['GROUP_8', 'GROUP_11', 'GROUP_21'],
  GROUP_19: ['GROUP_21', 'GROUP_23'],
  GROUP_20: ['GROUP_2', 'GROUP_4', 'GROUP_21', 'GROUP_23'],
  GROUP_21: ['GROUP_1', 'GROUP_2', 'GROUP_3', 'GROUP_4', 'GROUP_5', 'GROUP_6', 'GROUP_7', 'GROUP_8', 'GROUP_9', 'GROUP_10', 'GROUP_11', 'GROUP_12', 'GROUP_13', 'GROUP_14', 'GROUP_15', 'GROUP_16', 'GROUP_17', 'GROUP_18', 'GROUP_19', 'GROUP_20', 'GROUP_22', 'GROUP_23'],
  GROUP_22: ['GROUP_21'],
  GROUP_23: ['GROUP_1', 'GROUP_2', 'GROUP_4', 'GROUP_5', 'GROUP_6', 'GROUP_9', 'GROUP_17', 'GROUP_19', 'GROUP_20', 'GROUP_21'],
};

/**
 * Check whether two chemical compatibility groups can be stored together.
 */
export function areGroupsCompatible(groupA: string, groupB: string): boolean {
  if (groupA === groupB) return true;
  const incompatible = INCOMPATIBILITY_MATRIX[groupA];
  if (!incompatible) return true;
  return !incompatible.includes(groupB);
}
