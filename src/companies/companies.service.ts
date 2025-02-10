import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyEntity } from './entities/company.entity';
import { CompaniesRepository } from './repositories/companies.repository';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';
import { handleDatabaseErrors } from 'src/common/helpers/database-error.helper';
import { log } from 'src/common/helpers/logger.helper';

@Injectable()
export class CompaniesService {
  constructor(private readonly CompaniesRepository: CompaniesRepository) { }

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      return await this.CompaniesRepository.create(createCompanyDto);
    } catch (error) {
      log(`Error creating company: ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }
  }

  async findAll() {
    try {
      return await this.CompaniesRepository.findAll();
    } catch (error) {
      log(`Error listing companies: ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }
  }

  async findOne(id: string): Promise<CompanyEntity> {
    try {
      const company = await this.CompaniesRepository.findById(id);

      if(!company) {
        throw new NotFoundException(`Company with ID: ${id} not found`);
      }

      return company;
    } catch (error) {
      log(`Error searching company with ID ${id}: ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }
  }
  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    try {
      await this.findOne(id);

      return await this.CompaniesRepository.update(id, updateCompanyDto);
    } catch (error) {
      log(`Error updating company with ID ${id}: ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);

      return await this.CompaniesRepository.remove(id);
    } catch (error) {
      log(`Error removing company with ID ${id}: ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }
  }
}
