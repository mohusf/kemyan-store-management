import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum TransactionType {
  RECEIVE = 'receive',
  ISSUE = 'issue',
  TRANSFER = 'transfer',
  ADJUST = 'adjust',
  RETURN = 'return',
  WRITE_OFF = 'write_off',
}

@Entity('inventory_transactions')
export class InventoryTransaction {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'uuid', name: 'batch_id', nullable: true })
  batchId: string;

  @Column({ type: 'uuid', name: 'material_id' })
  materialId: string;

  @Column({ type: 'uuid', name: 'location_id', nullable: true })
  locationId: string;

  @Column({
    type: 'varchar',
    length: 30,
    name: 'transaction_type',
  })
  transactionType: TransactionType;

  @Column({ type: 'decimal', precision: 12, scale: 3 })
  quantity: number;

  @Column({ type: 'varchar', length: 100, name: 'reference_type' })
  referenceType: string;

  @Column({ type: 'uuid', name: 'reference_id' })
  referenceId: string;

  @Column({ type: 'uuid', name: 'performed_by' })
  performedBy: string;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @Column({ type: 'decimal', precision: 12, scale: 3, name: 'running_balance' })
  runningBalance: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
