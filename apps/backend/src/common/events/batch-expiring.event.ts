import { IEvent } from '@nestjs/cqrs';

export class BatchExpiringEvent implements IEvent {
  constructor(
    public readonly batchId: string,
    public readonly materialId: string,
    public readonly expiryDate: Date,
    public readonly daysUntilExpiry: number,
    public readonly quantityAvailable: number,
    public readonly occurredAt: Date = new Date(),
  ) {}
}
