import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';  // Importa Prisma para los tipos
import { PrismaService } from 'src/prisma/prisma.service';
import { CompanyEntity } from '../entities/company.entity';
import { CreateCompanyDto, UpdateCompanyDto } from '../dto';


@Injectable()
export class CompaniesRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateCompanyDto): Promise<CompanyEntity> {
        const companyData: Prisma.CompaniesCreateInput = {
            name: data.name,
            user: {
                connect: { id: data.userId }
            }
        };

        const company = await this.prisma.companies.create({ data: companyData });
        return new CompanyEntity(company);
    }

    async findById(id: string): Promise<CompanyEntity | null> {
        const company = await this.prisma.companies.findUnique({ where: { id } });
        return company ? new CompanyEntity(company) : null;
    }

    async findAll(): Promise<CompanyEntity[]> {
        const companies = await this.prisma.companies.findMany();
        return companies.map(company => new CompanyEntity(company));
    }

    async update(id: string, data: UpdateCompanyDto): Promise<CompanyEntity> {
        const companyData: Prisma.CompaniesUpdateInput = {
            name: data.name,
            isActive: data.isActive,
        }

        const company = await this.prisma.companies.update({ where: { id }, data: companyData });
        return new CompanyEntity(company);
    }

    async remove(id: string): Promise<void> {
        await this.prisma.companies.delete({ where: { id } });
    }
}
