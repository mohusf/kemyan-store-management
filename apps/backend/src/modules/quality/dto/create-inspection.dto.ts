import { IsUUID, IsString, IsOptional, IsObject } from 'class-validator';

export class CreateInspectionDto {
  @IsUUID() batchId: string;
  @IsString() inspectionType: string;
  @IsString() result: string;
  @IsOptional() @IsObject() parameters?: Record<string, any>;
  @IsOptional() @IsUUID() coaDocumentId?: string;
  @IsOptional() @IsString() notes?: string;
}

export class CreateNcrDto {
  @IsString() title: string;
  @IsString() description: string;
  @IsString() source: string;
  @IsString() severity: string;
  @IsOptional() @IsUUID() batchId?: string;
  @IsOptional() @IsUUID() materialId?: string;
  @IsOptional() @IsUUID() assignedTo?: string;
}

export class UpdateNcrDto {
  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsString() rootCause?: string;
  @IsOptional() @IsString() correctiveAction?: string;
  @IsOptional() @IsString() preventiveAction?: string;
  @IsOptional() @IsUUID() assignedTo?: string;
}

export class CreateCoaDto {
  @IsUUID() batchId: string;
  @IsOptional() @IsUUID() supplierId?: string;
  @IsString() documentUrl: string;
  @IsOptional() @IsObject() parameters?: Record<string, any>;
  @IsString() issuedAt: string;
}
