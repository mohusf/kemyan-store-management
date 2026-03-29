import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

export enum InspectionStatus {
  PENDING = 'pending',
  PASSED = 'passed',
  FAILED = 'failed',
  CONDITIONAL = 'conditional',
}

@Entity('goods_received_notes')
export class GoodsReceivedNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true, name: 'grn_number' })
  grnNumber: string;

  @Column({ type: 'uuid', name: 'purchase_order_id' })
  purchaseOrderId: string;

  @Column({ type: 'uuid', name: 'received_by' })
  receivedBy: string;

  @Column({ type: 'timestamp', name: 'received_at' })
  receivedAt: Date;

  @Column({
    type: 'enum',
    enum: InspectionStatus,
    default: InspectionStatus.PENDING,
    name: 'inspection_status',
  })
  inspectionStatus: InspectionStatus;
}
