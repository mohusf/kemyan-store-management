import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum TransactionType {
  RECEIPT = 'receipt',
  ISSUE = 'issue',
  TRANSFER_IN = 'transfer_in',
  TRANSFER_OUT = 'transfer_out',
  ADJUSTMENT_PLUS = 'adjustment_plus',
  ADJUSTMENT_MINUS = 'adjustment_minus',
  RETURN = 'return',
  WRITE_OFF = 'write_off',
}

@Entity('inventory_transactions')
export class InventoryTransaction {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'uuid', name: 'batch_id' })
  batchId: string;

  @Column({ type: 'uuid', name: 'material_id' })
  materialId: string;

  @Column({ type: 'uuid', name: 'location_id' })
  locationId: string;

  @Column({
    type: 'enum',
    enum: TransactionType,
    name: 'transaction_type',
  })
  transactionType: TransactionType;

  @Column({ type: 'decimal', precision: 14, scale: 4 })
  quantity: number;

  @Column({ type: 'varchar', length: 100, name: 'reference_type' })
  referenceType: string;

  @Column({ type: 'uuid', name: 'reference_id' })
  referenceId: string;

  @Column({ type: 'uuid', name: 'performed_by' })
  performedBy: string;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @Column({ type: 'decimal', precision: 14, scale: 4, name: 'running_balance' })
  runningBalance: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
