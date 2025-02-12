import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDeviceDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    site: string;

    @IsString()
    @IsNotEmpty()
    macAddress: string;

    @IsString()
    @IsNotEmpty()
    deviceType: string;

    @IsString()
    @IsNotEmpty()
    eventId: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
