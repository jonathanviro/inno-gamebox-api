import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { EventEntity } from "../entities/event.entity";
import { CreateEventDto, UpdateEventDto } from "../dto";

@Injectable()
export class EventsRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateEventDto): Promise<EventEntity> {
        const eventData: Prisma.EventsCreateInput = {
            name: data.name,
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
            company: { connect: { id: data.companyId } }
        };
        
        const event = await this.prisma.events.create({ data: eventData });
        return new EventEntity(event);
    }

    async findById(id: string): Promise<EventEntity | null> {
        const event = await this.prisma.events.findUnique({ where: { id } });
        return event ? new EventEntity(event) : null;
    }

    async findAll(): Promise<EventEntity[]> {
        const events = await this.prisma.events.findMany();
        return events.map(event => new EventEntity(event));
    }

    async update(id: string, data: UpdateEventDto): Promise<EventEntity> {
        const eventData: Prisma.EventsUpdateInput = {
            name: data.name,
            startDate: new Date(`${data.startDate}T00:00:00.000Z`),
            endDate: new Date(`${data.endDate}T00:00:00.000Z`),
            isActive: data.isActive
        }

        const event = await this.prisma.events.update({ where: { id }, data: eventData });
        return new EventEntity(event);
    }

    async remove(id: string): Promise<void> {
        await this.prisma.events.delete({ where: { id } });
    }
}