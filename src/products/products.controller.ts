import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, ResponseProductDto, UpdateProductDto } from './dto';
import { UpdateProductWithIdDto } from './dto/update-product-with-id.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    async create(@Body() createProductDto: CreateProductDto): Promise<ResponseProductDto> {
        const product = await this.productsService.create(createProductDto);
        return new ResponseProductDto(product);
    }

    @Get()
    async findAll(): Promise<ResponseProductDto[]> {
        const products = await this.productsService.findAll();
        return products.map(product => new ResponseProductDto(product));
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ResponseProductDto> {
        const product = await this.productsService.findOne(id);
        return new ResponseProductDto(product);
    }

    @Patch('updateProduct/:id')
    async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productsService.update(id, updateProductDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.productsService.remove(id);
    }

    @Post('createMany')
    async createMany(@Body() products: CreateProductDto[]) {
        return this.productsService.createMany(products);
    }

    @Patch('updateMany')
    async updateMany(@Body() products: UpdateProductWithIdDto[]) {
        return this.productsService.updateMany(products);
    }


    // @Get('findAllProductsByDeviceId')
    // async findAllProductsByDeviceId(@Param('id') id: string): Promise<ResponseProductDto[]> {
    //     const products = await this.productsService.findAllProductsByDeviceId(id);
    //     return products.map(product => new ResponseProductDto(product));
    // }
}