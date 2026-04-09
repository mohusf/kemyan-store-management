export enum CriticalityClass {
  A = 'A',
  B = 'B',
  C = 'C',
}

export enum PMStrategy {
  TBM = 'TBM',
  CBM = 'CBM',
  TBM_CBM = 'TBM/CBM',
  PREDICTIVE = 'Predictive',
  RTF = 'RTF',
}

export interface PlantUnit {
  id: string;
  unitCode: string;
  nameEn: string;
  nameAr?: string;
  sortOrder: number;
}

export interface EquipmentTypeCode {
  id: string;
  code: string;
  descriptionEn: string;
  descriptionAr?: string;
}

export interface Equipment {
  id: string;
  tagNumber: string;
  plantUnitId: string;
  equipmentTypeCodeId: string;
  sequentialNumber: number;
  suffix?: string;
  descriptionEn: string;
  descriptionAr?: string;
  location?: string;
  criticalityClass?: string;
  pmStrategy?: string;
  associatedPmWis?: string;
  serialNumber?: string;
  status: string;
  manufacturer?: string;
  model?: string;
  specifications?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
  plantUnit?: PlantUnit;
  equipmentTypeCode?: EquipmentTypeCode;
}
