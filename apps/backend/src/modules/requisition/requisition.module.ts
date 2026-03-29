import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { RequisitionService } from './requisition.service';
import { RequisitionController } from './requisition.controller';
import { Requisition } from './entities/requisition.entity';
import { ApprovalStep } from './entities/approval-step.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Requisition, ApprovalStep]),
    CqrsModule,
    AuthModule,
  ],
  controllers: [RequisitionController],
  providers: [RequisitionService],
  exports: [RequisitionService],
})
export class RequisitionModule {}
