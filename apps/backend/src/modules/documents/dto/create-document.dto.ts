import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateDocumentDto {
  @IsString() documentNumber: string;
  @IsString() titleEn: string;
  @IsOptional() @IsString() titleAr?: string;
  @IsString() category: string;
  @IsOptional() @IsString() version?: string;
  @IsOptional() @IsString() filePath?: string;
  @IsOptional() @IsDateString() effectiveDate?: string;
  @IsOptional() @IsDateString() reviewDate?: string;
}

export class UpdateDocumentDto {
  @IsOptional() @IsString() titleEn?: string;
  @IsOptional() @IsString() titleAr?: string;
  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsString() version?: string;
  @IsOptional() @IsString() filePath?: string;
  @IsOptional() @IsDateString() reviewDate?: string;
}
