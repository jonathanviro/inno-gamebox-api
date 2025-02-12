import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCompanyDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
