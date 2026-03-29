import {
  IsUUID,
  IsNumber,
  IsString,
  IsOptional,
  IsDateString,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ReceiveStockDto {
  @ApiProperty({ description: 'Material ID' })
  @IsUUID()
  materialId: string;

  @ApiProperty({ description: 'Lot number' })
  @IsString()
  lotNumber: string;

  @ApiProperty({ description: 'Storage location ID' })
  @IsUUID()
  locationId: string;

  @ApiProperty({ description: 'Quantity received' })
  @IsNumber()
  @Min(0.0001)
  quantity: number;

  @ApiPropertyOptional({ description: 'Supplier ID' })
  @IsOptional()
  @IsUUID()
  supplierId?: string;

  @ApiPropertyOptional({ description: 'Supplier batch number' })
  @IsOptional()
  @IsString()
  supplierBatchNumber?: string;

  @ApiPropertyOptional({ description: 'Manufacture date' })
  @IsOptional()
  @IsDateString()
  manufactureDate?: string;

  @ApiPropertyOptional({ description: 'Expiry date' })
  @IsOptional()
  @IsDateString()
  expiryDate?: string;

  @ApiProperty({ description: 'Reference type (e.g., purchase_order, return)' })
  @IsString()
  referenceType: string;

  @ApiProperty({ description: 'Reference ID' })
  @IsUUID()
  referenceId: string;

  @ApiPropertyOptional({ description: 'Reason for receipt' })
  @IsOptional()
  @IsString()
  reason?: string;
}
