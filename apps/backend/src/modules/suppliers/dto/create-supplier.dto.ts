import { IsString, IsOptional, IsEmail, IsBoolean, IsDateString } from 'class-validator';

export class CreateSupplierDto {
  @IsString() code: string;
  @IsString() nameEn: string;
  @IsOptional() @IsString() nameAr?: string;
  @IsOptional() @IsEmail() contactEmail?: string;
  @IsOptional() @IsString() contactPhone?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() country?: string;
  @IsOptional() @IsString() gmpPlusCertNumber?: string;
  @IsOptional() @IsDateString() gmpPlusCertExpiry?: string;
  @IsOptional() @IsString() famiqsCertNumber?: string;
  @IsOptional() @IsDateString() famiqsCertExpiry?: string;
}

export class CreateSupplierEvaluationDto {
  @IsOptional() @IsString() onTimeDeliveryScore?: number;
  @IsOptional() @IsString() qualityScore?: number;
  @IsOptional() @IsString() priceStabilityScore?: number;
  @IsOptional() @IsString() overallScore?: number;
  @IsOptional() @IsString() notes?: string;
}
