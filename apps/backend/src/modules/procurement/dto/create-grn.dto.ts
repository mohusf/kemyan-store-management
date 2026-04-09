import { IsUUID, IsArray, ValidateNested, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGrnLineDto {
  @IsOptional() @IsUUID() poLineId?: string;
  @IsUUID() materialId: string;
  @IsOptional() @IsUUID() batchId?: string;
  @IsNumber() @Min(0) quantityReceived: number;
  @IsOptional() @IsNumber() quantityAccepted?: number;
  @IsOptional() @IsNumber() quantityRejected?: number;
  @IsOptional() @IsString() rejectionReason?: string;
}

export class CreateGrnDto {
  @IsOptional() @IsUUID() purchaseOrderId?: string;
  @IsOptional() @IsString() notes?: string;
  @IsArray() @ValidateNested({ each: true }) @Type(() => CreateGrnLineDto)
  lines: CreateGrnLineDto[];
}
