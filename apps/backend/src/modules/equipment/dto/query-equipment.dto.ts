import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryEquipmentDto {
  @IsOptional() @IsString() plantUnitCode?: string;
  @IsOptional() @IsString() equipmentTypeCode?: string;
  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsString() criticalityClass?: string;
  @IsOptional() @IsString() pmStrategy?: string;
  @IsOptional() @IsString() search?: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) page?: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) limit?: number;
}
