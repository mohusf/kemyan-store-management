import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Supplier } from './supplier.entity';

@Entity('supplier_evaluations')
export class SupplierEvaluation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'supplier_id' })
  supplierId: string;

  @ManyToOne(() => Supplier)
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;

  @Column({ type: 'date', name: 'evaluation_date' })
  evaluationDate: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: 'on_time_delivery_score' })
  onTimeDeliveryScore: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: 'quality_score' })
  qualityScore: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: 'price_stability_score' })
  priceStabilityScore: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: 'overall_score' })
  overallScore: number;

  @Column({ type: 'uuid', name: 'evaluated_by' })
  evaluatedBy: string;
}
