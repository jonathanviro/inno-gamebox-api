import { Injectable, NotFoundException } from '@nestjs/common';
import { ConsumptionRepository } from './repositories/consumptions.repository';
import { CreateConsumptionDto, UpdateConsumptionDto } from './dto';
import { ConsumptionEntity } from './entities/consumption.entity';
import { log } from 'src/common/helpers/logger.helper';
import { handleDatabaseErrors } from 'src/common/helpers/database-error.helper';

@Injectable()
export class ConsumptionsService {
  constructor(private readonly consumptionRepository: ConsumptionRepository) { }

  async create(createConsumptionDto: CreateConsumptionDto): Promise<ConsumptionEntity> {
    try {
      return await this.consumptionRepository.create(createConsumptionDto);
    } catch (error) {
      log(`Error creating consumption: ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }
  }

  async findAll(): Promise<ConsumptionEntity[]> {
    try {
      return await this.consumptionRepository.findAll();
    } catch (error) {
      log(`Error listing consumptions: ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }
  }

  async findOne(id: string): Promise<ConsumptionEntity> {
    try {
      const consumption = await this.consumptionRepository.findById(id);
      if (!consumption) {
        throw new NotFoundException(`Consumption with ID ${id} not found`);
      }
      return consumption;
    } catch (error) {
      log(`Error searching consumption with ID ${id}: ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }
  }

  async update(id: string, updateConsumptionDto: UpdateConsumptionDto): Promise<ConsumptionEntity> {
    try {
      await this.findOne(id);
      return await this.consumptionRepository.update(id, updateConsumptionDto);
    } catch (error) {
      log(`Error updating consumption with ID ${id}: ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.consumptionRepository.remove(id);
    } catch (error) {
      log(`Error removing consumption with ID ${id}: ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }
  }
}
