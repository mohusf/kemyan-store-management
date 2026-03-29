import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { InventoryTransaction } from './entities/inventory-transaction.entity';
import { Batch } from './entities/batch.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryTransaction, Batch]),
    CqrsModule,
    AuthModule,
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService],
})
export class InventoryModule {}
