import {
  IsUUID,
  IsNumber,
  IsString,
  IsOptional,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class IssueStockDto {
  @ApiProperty({ description: 'Batch ID to issue from' })
  @IsUUID()
  batchId: string;

  @ApiProperty({ description: 'Material ID' })
  @IsUUID()
  materialId: string;

  @ApiProperty({ description: 'Storage location ID' })
  @IsUUID()
  locationId: string;

  @ApiProperty({ description: 'Quantity to issue' })
  @IsNumber()
  @Min(0.0001)
  quantity: number;

  @ApiProperty({ description: 'Reference type (e.g., production_order, requisition)' })
  @IsString()
  referenceType: string;

  @ApiProperty({ description: 'Reference ID' })
  @IsUUID()
  referenceId: string;

  @ApiPropertyOptional({ description: 'Reason for issuance' })
  @IsOptional()
  @IsString()
  reason?: string;
}
