import { IsString, IsOptional, IsDateString, IsUUID, IsInt } from 'class-validator';

export class CreateDocumentDto {
  @IsString() documentNumber: string;
  @IsString() titleEn: string;
  @IsOptional() @IsString() titleAr?: string;
  @IsString() category: string;
  @IsOptional() @IsString() version?: string;
  @IsOptional() @IsString() filePath?: string;
  @IsOptional() @IsDateString() effectiveDate?: string;
  @IsOptional() @IsDateString() reviewDate?: string;
  @IsOptional() @IsUUID() parentId?: string;
  @IsOptional() @IsString() documentLevel?: string;
  @IsOptional() @IsString() typeCode?: string;
  @IsOptional() @IsInt() chapter?: number;
  @IsOptional() @IsString() domain?: string;
  @IsOptional() @IsInt() sortOrder?: number;
}

export class UpdateDocumentDto {
  @IsOptional() @IsString() titleEn?: string;
  @IsOptional() @IsString() titleAr?: string;
  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsString() version?: string;
  @IsOptional() @IsString() filePath?: string;
  @IsOptional() @IsDateString() reviewDate?: string;
}
