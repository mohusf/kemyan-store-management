import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { CompatibilityService } from './services/compatibility.service';
import { StorageLocation } from './entities/storage-location.entity';
import { Zone } from './entities/zone.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StorageLocation, Zone]),
    AuthModule,
  ],
  controllers: [WarehouseController],
  providers: [WarehouseService, CompatibilityService],
  exports: [WarehouseService, CompatibilityService],
})
export class WarehouseModule {}
