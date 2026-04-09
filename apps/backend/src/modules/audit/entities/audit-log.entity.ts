import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 100, name: 'entity_type' })
  entityType: string;

  @Column({ type: 'varchar', length: 255, name: 'entity_id' })
  entityId: string;

  @Column({ type: 'varchar', length: 50 })
  action: string;

  @Column({ type: 'jsonb', name: 'previous_data', nullable: true })
  previousData: Record<string, any>;

  @Column({ type: 'jsonb', name: 'new_data', nullable: true })
  newData: Record<string, any>;

  @Column({ type: 'uuid', name: 'performed_by' })
  performedBy: string;

  @Column({ type: 'inet', name: 'ip_address', nullable: true })
  ipAddress: string;

  @Column({ type: 'varchar', length: 500, name: 'user_agent', nullable: true })
  userAgent: string;

  @Column({ type: 'varchar', length: 64, name: 'hash_chain', nullable: true })
  hashChain: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
