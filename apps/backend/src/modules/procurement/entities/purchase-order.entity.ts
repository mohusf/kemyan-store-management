import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { PurchaseOrderLine } from './purchase-order-line.entity';

export enum PurchaseOrderStatus {
  DRAFT = 'draft',
  PENDING_APPROVAL = 'pending_approval',
  APPROVED = 'approved',
  SENT_TO_SUPPLIER = 'sent_to_supplier',
  PARTIALLY_RECEIVED = 'partially_received',
  FULLY_RECEIVED = 'fully_received',
  CANCELLED = 'cancelled',
  CLOSED = 'closed',
}

@Entity('purchase_orders')
export class PurchaseOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true, name: 'po_number' })
  poNumber: string;

  @Column({ type: 'uuid', name: 'supplier_id' })
  supplierId: string;

  @Column({
    type: 'varchar',
    length: 30,
    default: PurchaseOrderStatus.DRAFT,
  })
  status: PurchaseOrderStatus;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'total_amount', default: 0 })
  totalAmount: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'vat_amount', default: 0 })
  vatAmount: number;

  @Column({ type: 'varchar', length: 3, default: 'SAR' })
  currency: string;

  @Column({ type: 'varchar', length: 255, name: 'zatca_invoice_id', nullable: true })
  zatcaInvoiceId: string;

  @Column({ type: 'uuid', name: 'created_by' })
  createdBy: string;

  @Column({ type: 'uuid', name: 'approved_by', nullable: true })
  approvedBy: string;

  @OneToMany(() => PurchaseOrderLine, (line) => line.purchaseOrder)
  lines: PurchaseOrderLine[];

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
