import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto, ResponseCompanyDto, UpdateCompanyDto } from './dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) { }

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto): Promise<ResponseCompanyDto> {
    const company = await this.companiesService.create(createCompanyDto);
    return new ResponseCompanyDto(company)
  }

  @Get()
  async findAll(): Promise<ResponseCompanyDto[]> {
    const companies = await this.companiesService.findAll();
    return companies.map(company => new ResponseCompanyDto(company));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseCompanyDto> {
    const company = await this.companiesService.findOne(id);
    return new ResponseCompanyDto(company);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return await this.companiesService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await  this.companiesService.remove(id);
  }
}
