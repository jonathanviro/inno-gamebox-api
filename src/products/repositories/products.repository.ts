import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductEntity } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dto';
import { UpdateProductWithIdDto } from '../dto/update-product-with-id.dto';

@Injectable()
export class ProductsRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateProductDto): Promise<ProductEntity> {
        const productData: Prisma.ProductsCreateInput = {
            name: data.name,
            sku: data.sku,
            stock: data.stock,
            imageUrl: data.imageUrl,
            device: { connect: { id: data.deviceId } }
        }

        const product = await this.prisma.products.create({ data: productData });
        return new ProductEntity(product);
    }

    async findById(id: string): Promise<ProductEntity | null> {
        // const product = await this.prisma.products.findUnique({ where: { id } });
        const product = await this.prisma.products.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                sku: true,
                stock: true,
                imageUrl: true,
            },
        });
        return product ? new ProductEntity(product) : null;
    }

    async findAll(): Promise<ProductEntity[]> {
        const products = await this.prisma.products.findMany({
            select: {
                id: true,
                name: true,
                sku: true,
                stock: true,
                imageUrl: true,
            },
        });
        return products.map(product => new ProductEntity(product));
    }

    async update(id: string, data: UpdateProductDto): Promise<ProductEntity> {
        const productData: Prisma.ProductsUpdateInput = {
            name: data.name,
            sku: data.sku,
            stock: data.stock,
            imageUrl: data.imageUrl,
            isActive: data.isActive
        }

        const product = await this.prisma.products.update({ where: { id }, data: productData });
        return new ProductEntity(product);
    }

    async remove(id: string): Promise<void> {
        await this.prisma.products.delete({ where: { id } });
    }

    async createMany(data: CreateProductDto[]): Promise<void> {
        const productData: Prisma.ProductsCreateManyInput[] = data.map(product => ({
            name: product.name,
            sku: product.sku,
            stock: product.stock,
            imageUrl: product.imageUrl,
            deviceId: product.deviceId,
        }));

        await this.prisma.products.createMany({
            data: productData
        });

        return;
    }

    async updateMany(data: UpdateProductWithIdDto[]): Promise<void> {
        const updatePromises = data.map(({ id, updates }) => {
            const productData: Prisma.ProductsUpdateInput = {
                name: updates.name,
                sku: updates.sku,
                stock: updates.stock,
                imageUrl: updates.imageUrl,
                isActive: updates.isActive,
            };

            return this.prisma.products.update({
                where: { id },
                data: productData,
            });
        });

        await Promise.all(updatePromises);
    }


}