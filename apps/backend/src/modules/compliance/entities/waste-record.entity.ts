import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

export enum WasteType {
  HAZARDOUS = 'hazardous',
  NON_HAZARDOUS = 'non_hazardous',
  RECYCLABLE = 'recyclable',
  CHEMICAL = 'chemical',
}

export enum DisposalMethod {
  INCINERATION = 'incineration',
  LANDFILL = 'landfill',
  RECYCLING = 'recycling',
  NEUTRALIZATION = 'neutralization',
  RETURN_TO_SUPPLIER = 'return_to_supplier',
  LICENSED_CONTRACTOR = 'licensed_contractor',
}

@Entity('waste_records')
export class WasteRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'material_id' })
  materialId: string;

  @Column({ type: 'uuid', name: 'batch_id', nullable: true })
  batchId: string;

  @Column({ type: 'enum', enum: WasteType, name: 'waste_type' })
  wasteType: WasteType;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  quantity: number;

  @Column({ type: 'enum', enum: DisposalMethod, name: 'disposal_method' })
  disposalMethod: DisposalMethod;

  @Column({ type: 'uuid', name: 'disposed_by' })
  disposedBy: string;

  @Column({ type: 'timestamp', name: 'disposed_at' })
  disposedAt: Date;

  @Column({ type: 'varchar', length: 100, name: 'transport_document_number', nullable: true })
  transportDocumentNumber: string;
}
