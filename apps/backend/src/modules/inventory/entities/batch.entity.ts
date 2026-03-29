import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
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

  @Column({ type: 'varchar', length: 50, unique: true, name: 'lot_number' })
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

  @Column({ type: 'decimal', precision: 12, scale: 3, name: 'quantity_received' })
  quantityReceived: number;

  @Column({ type: 'decimal', precision: 12, scale: 3, name: 'quantity_available' })
  quantityAvailable: number;

  @Column({
    type: 'varchar',
    length: 30,
    default: 'quarantine',
    name: 'quality_status',
  })
  qualityStatus: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: 'non_assured',
    name: 'gmp_plus_status',
  })
  gmpPlusStatus: string;

  @Column({ type: 'uuid', name: 'coa_document_id', nullable: true })
  coaDocumentId: string;

  @Column({ type: 'uuid', name: 'storage_location_id', nullable: true })
  storageLocationId: string;

  @Column({ type: 'uuid', array: true, name: 'raw_material_batches', default: '{}' })
  rawMaterialBatches: string[];

  @Column({ type: 'varchar', length: 50, name: 'production_order_id', nullable: true })
  productionOrderId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
