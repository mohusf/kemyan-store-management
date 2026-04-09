import { IsUUID, IsArray, ValidateNested, IsNumber, IsString, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePurchaseOrderLineDto {
  @IsUUID() materialId: string;
  @IsNumber() @Min(0) quantity: number;
  @IsNumber() @Min(0) unitPrice: number;
  @IsOptional() @IsString() notes?: string;
}

export class CreatePurchaseOrderDto {
  @IsUUID() supplierId: string;
  @IsOptional() @IsString() currency?: string;
  @IsOptional() @IsString() notes?: string;
  @IsArray() @ValidateNested({ each: true }) @Type(() => CreatePurchaseOrderLineDto)
  lines: CreatePurchaseOrderLineDto[];
}
