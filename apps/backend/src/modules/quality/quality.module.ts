import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QualityService } from './quality.service';
import { QualityController } from './quality.controller';
import { Inspection } from './entities/inspection.entity';
import { Ncr } from './entities/ncr.entity';
import { Coa } from './entities/coa.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inspection, Ncr, Coa]),
    AuthModule,
  ],
  controllers: [QualityController],
  providers: [QualityService],
  exports: [QualityService],
})
export class QualityModule {}
