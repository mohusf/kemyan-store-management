import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';

export interface LogEventParams {
  entityType: string;
  entityId: string;
  action: string;
  previousData?: Record<string, any>;
  newData?: Record<string, any>;
  performedBy: string;
  ipAddress?: string;
  userAgent?: string;
}

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogRepository: Repository<AuditLog>,
  ) {}

  async logEvent(params: LogEventParams): Promise<AuditLog> {
    const log = this.auditLogRepository.create({
      ...params,
      hashChain: '',
    });

    return this.auditLogRepository.save(log);
  }

  async getAuditTrail(
    entityType?: string,
    entityId?: string,
    page = 1,
    limit = 50,
  ): Promise<{ data: AuditLog[]; total: number }> {
    const queryBuilder = this.auditLogRepository.createQueryBuilder('log');

    if (entityType) {
      queryBuilder.andWhere('log.entity_type = :entityType', { entityType });
    }
    if (entityId) {
      queryBuilder.andWhere('log.entity_id = :entityId', { entityId });
    }

    queryBuilder
      .orderBy('log.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();
    return { data, total };
  }

}
