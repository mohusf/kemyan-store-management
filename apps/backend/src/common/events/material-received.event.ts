import { IEvent } from '@nestjs/cqrs';

export class MaterialReceivedEvent implements IEvent {
  constructor(
    public readonly materialId: string,
    public readonly batchId: string,
    public readonly quantity: number,
    public readonly occurredAt: Date = new Date(),
  ) {}
}
