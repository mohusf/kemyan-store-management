import { IEvent } from '@nestjs/cqrs';

export class RequisitionStatusChangedEvent implements IEvent {
  constructor(
    public readonly requisitionId: string,
    public readonly previousStatus: string,
    public readonly newStatus: string,
    public readonly occurredAt: Date = new Date(),
  ) {}
}
