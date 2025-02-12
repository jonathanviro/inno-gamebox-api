import { Injectable, NotFoundException } from '@nestjs/common';
import { DeviceRepository } from './repositories/devices.repository';
import { CreateDeviceDto, UpdateDeviceDto } from './dto';
import { DeviceEntity } from './entities/device.entity';
import { log } from 'src/common/helpers/logger.helper';
import { handleDatabaseErrors } from 'src/common/helpers/database-error.helper';

@Injectable()
export class DevicesService {
  constructor(private readonly deviceRepository: DeviceRepository) { }

  async create(createDeviceDto: CreateDeviceDto) {
    try {
      return await this.deviceRepository.create(createDeviceDto);
    } catch (error) {
      log(`Error creating device: ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }
  }

  async findAll() {
    try {
      return await this.deviceRepository.findAll();
    } catch (error) {
      log(`Error listing devices: ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }
  }

  async findOne(id: string): Promise<DeviceEntity> {
    try {
      const device = await this.deviceRepository.findById(id);
      if (!device) {
        throw new NotFoundException(`Device with ID ${id} not found`);
      }
      return device;
    } catch (error) {
      log(`Error searching device with ID ${id}: ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }
  }

  async update(id: string, updateDeviceDto: UpdateDeviceDto) {
    try {
      await this.findOne(id);
      return await this.deviceRepository.update(id, updateDeviceDto);
    } catch (error) {
      log(`Error updating device with ID ${id}: ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);
      return await this.deviceRepository.remove(id);
    } catch (error) {
      log(`Error creating event with ID ${id}: ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }
  }
}
