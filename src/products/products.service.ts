import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './repositories/products.repository';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ProductEntity } from './entities/product.entity';
import { log } from 'src/common/helpers/logger.helper';
import { handleDatabaseErrors } from 'src/common/helpers/database-error.helper';
import { UpdateProductWithIdDto } from './dto/update-product-with-id.dto';


@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) { }

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.productsRepository.create(createProductDto);
    } catch (error) {
      log(`Error creating product: ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }
  }

  async findAll() {
    try {
      return await this.productsRepository.findAll();
    } catch (error) {
      log(`Error listing products: ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }
  }

  async findOne(id: string): Promise<ProductEntity> {
    try {
      const product = await this.productsRepository.findById(id);
      if (!product) throw new NotFoundException('Product not found');
      return product;
    } catch (error) {
      log(`Error searching product with ID ${id}: ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      await this.findOne(id);
      return await this.productsRepository.update(id, updateProductDto);
    } catch (error) {
      log(`Error updating product with ID ${id}: ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);
      return await this.productsRepository.remove(id);
    } catch (error) {
      log(`Error removing product with ID ${id}: ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }
  }

  async createMany(products: CreateProductDto[]) {
    try {
      await this.productsRepository.createMany(products);
    } catch (error) {
      log(`Error creating multiple products: ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }
  }

  async updateMany(products: UpdateProductWithIdDto[]) {
    try {
      await this.productsRepository.updateMany(products);
    } catch (error) {
      log(`Error updating multiple products: ${error.message}`, 'error');
      handleDatabaseErrors(error);
    }
  }


  // async findAllProductsByDeviceId(id: string) {
  //   try {
  //     return await this.productsRepository.findAll({});
  //   } catch (error) {
  //     log(`Error listing products: ${error.message}`, 'error');
  //     handleDatabaseErrors(error);
  //   }
  // }
}
