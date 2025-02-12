import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { DeviceRepository } from './repositories/devices.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DevicesController],
  providers: [DevicesService, DeviceRepository, PrismaService],
})
export class DevicesModule {}
