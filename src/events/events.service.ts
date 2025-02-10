import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsRepository } from './repositories/events.repository';
import { EventEntity } from './entities/event.entity';
import { log } from 'src/common/helpers/logger.helper';
import { handleDatabaseErrors } from 'src/common/helpers/database-error.helper';

@Injectable()
export class EventsService {
  constructor(private readonly eventRepository: EventsRepository) { }

  async create(createEventDto: CreateEventDto) {
    try {
      return await this.eventRepository.create(createEventDto);
    } catch (error) {
      log(`Error creating event: ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }
  }

  async findAll() {
    try {
      return await this.eventRepository.findAll();
    } catch (error) {
      log(`Error listing events: ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }
  }

  async findOne(id: string): Promise<EventEntity> {
    try {
      const event = await this.eventRepository.findById(id);
      if (!event) {
        throw new NotFoundException(`Event with ID ${id} not found`);
      }
      return event;
    } catch (error) {
      log(`Error searching event with ID ${id}: ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    try {
      await this.findOne(id);

      return await this.eventRepository.update(id, updateEventDto);
    } catch (error) {
      log(`Error updating event with ID ${id}: ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);
      
      return await this.eventRepository.remove(id);
    } catch (error) {
      log(`Error creating event with ID ${id}: ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }
  }
}