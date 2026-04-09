import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sds_records')
export class SdsRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'material_id' })
  materialId: string;

  @Column({ type: 'varchar', length: 20 })
  version: string;

  @Column({ type: 'varchar', length: 20, name: 'signal_word', nullable: true })
  signalWord: string;

  @Column({ type: 'jsonb', default: '[]' })
  pictograms: string[];

  @Column({ type: 'jsonb', name: 'h_statements', default: '[]' })
  hStatements: any;

  @Column({ type: 'jsonb', name: 'p_statements', default: '[]' })
  pStatements: any;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: 'storage_temperature_min', nullable: true })
  storageTemperatureMin: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: 'storage_temperature_max', nullable: true })
  storageTemperatureMax: number;

  @Column({ type: 'jsonb', name: 'incompatible_materials', default: '[]' })
  incompatibleMaterials: string[];

  @Column({ type: 'jsonb', name: 'required_ppe', default: '[]' })
  requiredPpe: string[];

  @Column({ type: 'date', name: 'effective_date' })
  effectiveDate: string | Date;

  @Column({ type: 'date', name: 'superseded_date', nullable: true })
  supersededDate: string | Date;

  @Column({ type: 'text', name: 'document_url', nullable: true })
  documentUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
