import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('grn_lines')
export class GrnLine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'grn_id' })
  grnId: string;

  @Column({ type: 'uuid', name: 'po_line_id', nullable: true })
  poLineId: string;

  @Column({ type: 'uuid', name: 'material_id' })
  materialId: string;

  @Column({ type: 'uuid', name: 'batch_id', nullable: true })
  batchId: string;

  @Column({ type: 'decimal', precision: 12, scale: 3, name: 'quantity_received' })
  quantityReceived: number;

  @Column({ type: 'decimal', precision: 12, scale: 3, name: 'quantity_accepted', nullable: true })
  quantityAccepted: number;

  @Column({ type: 'decimal', precision: 12, scale: 3, name: 'quantity_rejected', default: 0 })
  quantityRejected: number;

  @Column({ type: 'text', name: 'rejection_reason', nullable: true })
  rejectionReason: string;
}
