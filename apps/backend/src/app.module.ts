import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { MaterialsModule } from './modules/materials/materials.module';
import { RequisitionModule } from './modules/requisition/requisition.module';
import { ProcurementModule } from './modules/procurement/procurement.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { WarehouseModule } from './modules/warehouse/warehouse.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { QualityModule } from './modules/quality/quality.module';
import { ComplianceModule } from './modules/compliance/compliance.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { ReportingModule } from './modules/reporting/reporting.module';
import { AuditModule } from './modules/audit/audit.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      envFilePath: ['.env.local', '.env'],
    }),

    // Database
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
    }),

    // CQRS
    CqrsModule.forRoot(),

    // Domain Modules
    AuthModule,
    MaterialsModule,
    RequisitionModule,
    ProcurementModule,
    InventoryModule,
    WarehouseModule,
    SuppliersModule,
    QualityModule,
    ComplianceModule,
    DocumentsModule,
    ReportingModule,
    AuditModule,
  ],
})
export class AppModule {}
