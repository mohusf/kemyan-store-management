import { IsString, IsOptional, IsUUID, IsNumber, IsArray } from 'class-validator';

export class CreateLocationDto {
  @IsString() code: string;
  @IsOptional() @IsString() nameEn?: string;
  @IsOptional() @IsString() nameAr?: string;
  @IsUUID() zoneId: string;
  @IsOptional() @IsString() aisle?: string;
  @IsOptional() @IsString() rack?: string;
  @IsOptional() @IsString() bin?: string;
  @IsString() locationType: string;
  @IsOptional() @IsArray() compatibilityGroups?: string[];
  @IsOptional() @IsNumber() maxCapacity?: number;
  @IsOptional() @IsNumber() temperatureMin?: number;
  @IsOptional() @IsNumber() temperatureMax?: number;
  @IsOptional() @IsNumber() humidityMax?: number;
  @IsOptional() requiredPpe?: any;
}

export class CreateZoneDto {
  @IsString() code: string;
  @IsString() nameEn: string;
  @IsOptional() @IsString() nameAr?: string;
  @IsString() zoneType: string;
  @IsOptional() @IsArray() allowedCompatibilityGroups?: string[];
  @IsOptional() safetyEquipment?: any;
  @IsOptional() @IsNumber() maxTemperature?: number;
  @IsOptional() @IsNumber() maxHumidity?: number;
}
