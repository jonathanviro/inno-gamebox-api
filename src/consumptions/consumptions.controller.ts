import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsumptionsService } from './consumptions.service';
import { CreateConsumptionDto, UpdateConsumptionDto } from './dto';
import { ResponseConsumptionDto } from './dto/response-consuption.dto';


@Controller('consumptions')
export class ConsumptionsController {
  constructor(private readonly consumptionsService: ConsumptionsService) {}

  @Post()
  async create(@Body() createConsumptionDto: CreateConsumptionDto): Promise<ResponseConsumptionDto> {
    const consumption = await this.consumptionsService.create(createConsumptionDto);
    return new ResponseConsumptionDto(consumption);
  }

  @Get()
  async findAll(): Promise<ResponseConsumptionDto[]> {
    const consumptions = await this.consumptionsService.findAll();
    return consumptions.map(consumption => new ResponseConsumptionDto(consumption));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseConsumptionDto> {
    const consumption = await this.consumptionsService.findOne(id);
    return new ResponseConsumptionDto(consumption);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateConsumptionDto: UpdateConsumptionDto) {
    return this.consumptionsService.update(id, updateConsumptionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.consumptionsService.remove(id);
  }
}
