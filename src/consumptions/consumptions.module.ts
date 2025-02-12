import { Module } from '@nestjs/common';
import { ConsumptionsService } from './consumptions.service';
import { ConsumptionsController } from './consumptions.controller';
import { ConsumptionRepository } from './repositories/consumptions.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ConsumptionsController],
  providers: [ConsumptionsService, ConsumptionRepository, PrismaService],
})
export class ConsumptionsModule {}
