import { IsString, IsInt, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateConsumptionDto {
  @IsString()
  @IsNotEmpty()
  invoice: string;

  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsInt()
  @IsOptional()
  amount?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
