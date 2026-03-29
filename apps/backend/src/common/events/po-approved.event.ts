import { IEvent } from '@nestjs/cqrs';

export class PoApprovedEvent implements IEvent {
  constructor(
    public readonly purchaseOrderId: string,
    public readonly poNumber: string,
    public readonly supplierId: string,
    public readonly occurredAt: Date = new Date(),
  ) {}
}
