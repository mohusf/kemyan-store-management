import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialsService } from './materials.service';
import { MaterialsController } from './materials.controller';
import { Material } from './entities/material.entity';
import { MaterialCategory } from './entities/material-category.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Material, MaterialCategory]),
    AuthModule,
  ],
  controllers: [MaterialsController],
  providers: [MaterialsService],
  exports: [MaterialsService],
})
export class MaterialsModule {}
