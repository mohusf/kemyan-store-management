import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum QualificationStatus {
  PENDING = 'pending',
  QUALIFIED = 'qualified',
  CONDITIONAL = 'conditional',
  DISQUALIFIED = 'disqualified',
  UNDER_REVIEW = 'under_review',
}

@Entity('suppliers')
export class Supplier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 255, name: 'name_ar' })
  nameAr: string;

  @Column({ type: 'varchar', length: 255, name: 'name_en' })
  nameEn: string;

  @Column({ type: 'varchar', length: 255, name: 'contact_email', nullable: true })
  contactEmail: string;

  @Column({ type: 'varchar', length: 50, name: 'contact_phone', nullable: true })
  contactPhone: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 100, name: 'gmp_plus_cert_number', nullable: true })
  gmpPlusCertNumber: string;

  @Column({ type: 'date', name: 'gmp_plus_cert_expiry', nullable: true })
  gmpPlusCertExpiry: Date;

  @Column({ type: 'varchar', length: 100, name: 'famiqs_cert_number', nullable: true })
  famiqsCertNumber: string;

  @Column({ type: 'date', name: 'famiqs_cert_expiry', nullable: true })
  famiqsCertExpiry: Date;

  @Column({
    type: 'varchar',
    length: 30,
    default: QualificationStatus.PENDING,
    name: 'qualification_status',
  })
  qualificationStatus: QualificationStatus;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: 'performance_score', default: 0 })
  performanceScore: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country: string;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
