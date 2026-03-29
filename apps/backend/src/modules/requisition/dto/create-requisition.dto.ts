import {
  IsUUID,
  IsNumber,
  IsEnum,
  IsOptional,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UrgencyLevel } from '../entities/requisition.entity';

export class CreateRequisitionDto {
  @ApiProperty({ description: 'Material ID to request' })
  @IsUUID()
  materialId: string;

  @ApiProperty({ description: 'Requested quantity' })
  @IsNumber()
  @Min(0.01)
  quantity: number;

  @ApiPropertyOptional({ description: 'Urgency level', enum: UrgencyLevel })
  @IsOptional()
  @IsEnum(UrgencyLevel)
  urgency?: UrgencyLevel;

  @ApiPropertyOptional({ description: 'Estimated value in SAR' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  estimatedValue?: number;

  @ApiProperty({ description: 'Department ID' })
  @IsUUID()
  departmentId: string;
}
