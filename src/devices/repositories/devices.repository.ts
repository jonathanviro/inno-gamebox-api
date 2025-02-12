import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeviceEntity } from '../entities/device.entity';
import { CreateDeviceDto, UpdateDeviceDto } from '../dto';

@Injectable()
export class DeviceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateDeviceDto): Promise<DeviceEntity> {
    const deviceData: Prisma.DevicesCreateInput = {
      name: data.name,
      site: data.site,
      macAddress: data.macAddress,
      deviceType: data.deviceType,
      event: { connect: { id: data.eventId } },
    };

    const device = await this.prisma.devices.create({ data: deviceData });
    return new DeviceEntity(device);
  }

  async findById(id: string): Promise<DeviceEntity | null> {
    const device = await this.prisma.devices.findUnique({ where: { id } });
    return device ? new DeviceEntity(device) : null;
  }

  async findAll(): Promise<DeviceEntity[]> {
    const devices = await this.prisma.devices.findMany();
    return devices.map(device => new DeviceEntity(device));
  }

  async update(id: string, data: UpdateDeviceDto): Promise<DeviceEntity> {
    const deviceData: Prisma.DevicesUpdateInput = {
        name: data.name,
        site: data.site,
        macAddress: data.macAddress,
        deviceType: data.deviceType,
        isActive: data.isActive
      };
    
    const device = await this.prisma.devices.update({ where: { id }, data: deviceData });
    return new DeviceEntity(device);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.devices.delete({ where: { id } });
  }
}
