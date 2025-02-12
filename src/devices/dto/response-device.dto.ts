import { IsBoolean, IsOptional, IsString } from "class-validator";

export class ResponseDeviceDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    local?: string;

    @IsString()
    @IsOptional()
    macAddress?: string;

    @IsString()
    @IsOptional()
    deviceType?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    constructor(partial: Partial<ResponseDeviceDto>) {
        Object.assign(this, partial);
      }
}