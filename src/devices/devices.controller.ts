import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto, ResponseDeviceDto, UpdateDeviceDto } from './dto';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  async create(@Body() createDeviceDto: CreateDeviceDto): Promise<ResponseDeviceDto> {
    const device = await this.devicesService.create(createDeviceDto);
    return new ResponseDeviceDto(device);
  }

  @Get()
  async findAll(): Promise<ResponseDeviceDto[]> {
    const devices = await this.devicesService.findAll();
    return devices.map(device => new ResponseDeviceDto(device));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseDeviceDto> {
    const device = await this.devicesService.findOne(id);
    return new ResponseDeviceDto(device);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.devicesService.update(id, updateDeviceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.devicesService.remove(id);
  }
}
