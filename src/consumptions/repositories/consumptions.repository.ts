import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateConsumptionDto, UpdateConsumptionDto } from '../dto';
import { ConsumptionEntity } from '../entities/consumption.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class ConsumptionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateConsumptionDto): Promise<ConsumptionEntity> {
    const consumptionData: Prisma.ConsumptionsCreateInput = {
      invoice: data.invoice,
      amount: data.amount || 1,
      product: { connect: { id: data.productId } },
    };
    const consumption = await this.prisma.consumptions.create({ data: consumptionData });
    return new ConsumptionEntity(consumption);
  }

  async findById(id: string): Promise<ConsumptionEntity | null> {
    const consumption = await this.prisma.consumptions.findUnique({ where: { id } });
    return consumption ? new ConsumptionEntity(consumption) : null;
  }

  async findAll(): Promise<ConsumptionEntity[]> {
    const consumptions = await this.prisma.consumptions.findMany();
    return consumptions.map(consumption => new ConsumptionEntity(consumption));
  }

  async update(id: string, data: UpdateConsumptionDto): Promise<ConsumptionEntity> {
    const consumption = await this.prisma.consumptions.update({ where: { id }, data });
    return new ConsumptionEntity(consumption);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.consumptions.delete({ where: { id } });
  }
}