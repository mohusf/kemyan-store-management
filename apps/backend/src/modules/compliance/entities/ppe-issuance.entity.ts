import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('ppe_issuances')
export class PpeIssuance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @Column({ type: 'varchar', length: 100, name: 'ppe_type' })
  ppeType: string;

  @Column({ type: 'timestamp', name: 'issued_at' })
  issuedAt: Date;

  @Column({ type: 'timestamp', name: 'returned_at', nullable: true })
  returnedAt: Date;

  @Column({ type: 'varchar', length: 50, name: 'condition_on_return', nullable: true })
  condition: string;

  @Column({ type: 'text', nullable: true })
  notes: string;
}
