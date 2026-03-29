import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsObject,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum ReportType {
  INVENTORY_SUMMARY = 'inventory_summary',
  STOCK_MOVEMENT = 'stock_movement',
  EXPIRY_REPORT = 'expiry_report',
  REORDER_REPORT = 'reorder_report',
  SUPPLIER_PERFORMANCE = 'supplier_performance',
  QUALITY_SUMMARY = 'quality_summary',
  CONSUMPTION_ANALYSIS = 'consumption_analysis',
  WASTE_REPORT = 'waste_report',
  COMPLIANCE_STATUS = 'compliance_status',
  AUDIT_TRAIL = 'audit_trail',
}

export enum ReportFormat {
  PDF = 'pdf',
  EXCEL = 'excel',
}

export class ReportQueryDto {
  @ApiProperty({ description: 'Start date for report period' })
  @IsDateString()
  dateFrom: string;

  @ApiProperty({ description: 'End date for report period' })
  @IsDateString()
  dateTo: string;

  @ApiProperty({ description: 'Type of report', enum: ReportType })
  @IsEnum(ReportType)
  reportType: ReportType;

  @ApiProperty({ description: 'Output format', enum: ReportFormat })
  @IsEnum(ReportFormat)
  format: ReportFormat;

  @ApiPropertyOptional({ description: 'Additional filters' })
  @IsOptional()
  @IsObject()
  filters?: Record<string, any>;
}
