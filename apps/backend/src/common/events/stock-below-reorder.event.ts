import { IEvent } from '@nestjs/cqrs';

export class StockBelowReorderEvent implements IEvent {
  constructor(
    public readonly materialId: string,
    public readonly currentStock: number,
    public readonly reorderPoint: number,
    public readonly reorderQuantity: number,
    public readonly occurredAt: Date = new Date(),
  ) {}
}
