import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsUUID,
  IsObject,
  MaxLength,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMaterialDto {
  @ApiProperty({ description: 'Unique material code' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  code: string;

  @ApiProperty({ description: 'Material name in Arabic' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  nameAr: string;

  @ApiProperty({ description: 'Material name in English' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  nameEn: string;

  @ApiPropertyOptional({ description: 'Category ID' })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiProperty({ description: 'Unit of measurement' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  unit: string;

  @ApiPropertyOptional({ description: 'GHS classification data' })
  @IsOptional()
  @IsObject()
  ghsClassification?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Reorder point quantity' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  reorderPoint?: number;

  @ApiPropertyOptional({ description: 'Reorder quantity' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  reorderQuantity?: number;

  @ApiPropertyOptional({ description: 'Minimum shelf life percentage' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  minimumShelfLifePercent?: number;

  @ApiPropertyOptional({ description: 'Whether the material is feed grade' })
  @IsOptional()
  @IsBoolean()
  isFeedGrade?: boolean;

  @ApiPropertyOptional({ description: 'SDS document ID' })
  @IsOptional()
  @IsUUID()
  sdsDocumentId?: string;

  @ApiPropertyOptional({ description: 'Material specifications' })
  @IsOptional()
  @IsObject()
  specifications?: Record<string, any>;
}
