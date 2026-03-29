import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum QualityStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  QUARANTINE = 'quarantine',
  CONDITIONAL = 'conditional',
}

export enum GmpPlusStatus {
  NOT_APPLICABLE = 'not_applicable',
  PENDING = 'pending',
  COMPLIANT = 'compliant',
  NON_COMPLIANT = 'non_compliant',
}

@Entity('batches')
export class Batch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'material_id' })
  materialId: string;

  @Column({ type: 'varchar', length: 100, unique: true, name: 'lot_number' })
  lotNumber: string;

  @Column({ type: 'uuid', name: 'supplier_id', nullable: true })
  supplierId: string;

  @Column({ type: 'varchar', length: 100, name: 'supplier_batch_number', nullable: true })
  supplierBatchNumber: string;

  @Column({ type: 'date', name: 'manufacture_date', nullable: true })
  manufactureDate: Date;

  @Column({ type: 'date', name: 'expiry_date', nullable: true })
  expiryDate: Date;

  @Column({ type: 'date', name: 'received_date' })
  receivedDate: Date;

  @Column({ type: 'decimal', precision: 14, scale: 4, name: 'quantity_received' })
  quantityReceived: number;

  @Column({ type: 'decimal', precision: 14, scale: 4, name: 'quantity_available' })
  quantityAvailable: number;

  @Column({
    type: 'enum',
    enum: QualityStatus,
    default: QualityStatus.PENDING,
    name: 'quality_status',
  })
  qualityStatus: QualityStatus;

  @Column({
    type: 'enum',
    enum: GmpPlusStatus,
    default: GmpPlusStatus.NOT_APPLICABLE,
    name: 'gmp_plus_status',
  })
  gmpPlusStatus: GmpPlusStatus;

  @Column({ type: 'uuid', name: 'coa_document_id', nullable: true })
  coaDocumentId: string;

  @Column({ type: 'uuid', name: 'storage_location_id', nullable: true })
  storageLocationId: string;

  @Column({ type: 'uuid', array: true, name: 'raw_material_batches', default: '{}' })
  rawMaterialBatches: string[];

  @Column({ type: 'uuid', name: 'production_order_id', nullable: true })
  productionOrderId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
