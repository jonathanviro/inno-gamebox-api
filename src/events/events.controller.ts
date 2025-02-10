import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto, ResponseEventDto, UpdateEventDto } from './dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @Post()
  async create(@Body() createEventDto: CreateEventDto): Promise<ResponseEventDto> {
    const event = await this.eventsService.create(createEventDto);
    return new ResponseEventDto(event);
  }

  @Get()
  async findAll(): Promise<ResponseEventDto[]> {
    const events = await this.eventsService.findAll();
    return events.map(event => new ResponseEventDto(event));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseEventDto> {
    const event = await this.eventsService.findOne(id);
    return new ResponseEventDto(event);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return await this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.eventsService.remove(id);
  }
}
