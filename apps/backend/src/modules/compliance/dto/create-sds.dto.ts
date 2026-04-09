import { IsUUID, IsString, IsOptional, IsArray, IsNumber, IsDateString } from 'class-validator';

export class CreateSdsDto {
  @IsUUID() materialId: string;
  @IsString() version: string;
  @IsOptional() @IsString() signalWord?: string;
  @IsOptional() @IsArray() pictograms?: string[];
  @IsOptional() @IsArray() hStatements?: string[];
  @IsOptional() @IsArray() pStatements?: string[];
  @IsOptional() @IsNumber() storageTemperatureMin?: number;
  @IsOptional() @IsNumber() storageTemperatureMax?: number;
  @IsOptional() incompatibleMaterials?: any;
  @IsOptional() requiredPpe?: any;
  @IsDateString() effectiveDate: string;
  @IsOptional() @IsString() documentUrl?: string;
}

export class CreateWasteRecordDto {
  @IsOptional() @IsUUID() materialId?: string;
  @IsOptional() @IsUUID() batchId?: string;
  @IsString() wasteType: string;
  @IsNumber() quantity: number;
  @IsString() unit: string;
  @IsOptional() @IsString() disposalMethod?: string;
  @IsOptional() @IsString() transportDocumentNumber?: string;
  @IsOptional() @IsString() notes?: string;
}

export class CreatePpeIssuanceDto {
  @IsUUID() userId: string;
  @IsString() ppeType: string;
}
