import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createHash } from 'crypto';
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
    const lastLog = await this.auditLogRepository.findOne({
      order: { id: 'DESC' },
    });

    const previousHash = lastLog?.hashChain || '0'.repeat(64);
    const hashInput = JSON.stringify({
      previousHash,
      entityType: params.entityType,
      entityId: params.entityId,
      action: params.action,
      performedBy: params.performedBy,
      timestamp: new Date().toISOString(),
    });

    const hashChain = createHash('sha256').update(hashInput).digest('hex');

    const log = this.auditLogRepository.create({
      ...params,
      hashChain,
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

  async verifyChainIntegrity(): Promise<{ isValid: boolean; brokenAt?: number }> {
    const logs = await this.auditLogRepository.find({
      order: { id: 'ASC' },
    });

    let previousHash = '0'.repeat(64);

    for (const log of logs) {
      const hashInput = JSON.stringify({
        previousHash,
        entityType: log.entityType,
        entityId: log.entityId,
        action: log.action,
        performedBy: log.performedBy,
        timestamp: log.createdAt.toISOString(),
      });

      const expectedHash = createHash('sha256').update(hashInput).digest('hex');

      if (log.hashChain !== expectedHash) {
        return { isValid: false, brokenAt: Number(log.id) };
      }

      previousHash = log.hashChain;
    }

    return { isValid: true };
  }
}
