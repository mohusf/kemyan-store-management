import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

export enum InspectionType {
  INCOMING = 'incoming',
  IN_PROCESS = 'in_process',
  FINAL = 'final',
  ENVIRONMENTAL = 'environmental',
}

export enum InspectionResult {
  PASS = 'pass',
  FAIL = 'fail',
  CONDITIONAL = 'conditional',
  PENDING = 'pending',
}

@Entity('inspections')
export class Inspection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'batch_id' })
  batchId: string;

  @Column({
    type: 'enum',
    enum: InspectionType,
    name: 'inspection_type',
  })
  inspectionType: InspectionType;

  @Column({ type: 'uuid', name: 'inspector_id' })
  inspectorId: string;

  @Column({
    type: 'enum',
    enum: InspectionResult,
    default: InspectionResult.PENDING,
  })
  result: InspectionResult;

  @Column({ type: 'jsonb', nullable: true })
  parameters: Record<string, any>;

  @Column({ type: 'uuid', name: 'coa_document_id', nullable: true })
  coaDocumentId: string;

  @Column({ type: 'timestamp', name: 'inspected_at' })
  inspectedAt: Date;
}
