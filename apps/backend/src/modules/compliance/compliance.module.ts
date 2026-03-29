import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplianceService } from './compliance.service';
import { ComplianceController } from './compliance.controller';
import { SdsRecord } from './entities/sds-record.entity';
import { WasteRecord } from './entities/waste-record.entity';
import { PpeIssuance } from './entities/ppe-issuance.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SdsRecord, WasteRecord, PpeIssuance]),
    AuthModule,
  ],
  controllers: [ComplianceController],
  providers: [ComplianceService],
  exports: [ComplianceService],
})
export class ComplianceModule {}
