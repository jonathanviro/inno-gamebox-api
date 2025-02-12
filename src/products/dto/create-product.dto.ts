import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    sku: string;

    @IsInt()
    @IsNotEmpty()
    stock: number;

    @IsString()
    @IsOptional()
    imageUrl?: string;

    @IsString()
    @IsNotEmpty()
    deviceId: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}