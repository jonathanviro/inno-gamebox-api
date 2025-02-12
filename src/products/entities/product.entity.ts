export class ProductEntity {
    id: string;
    name: string;
    sku: string;
    stock: number;
    deviceId: string;
    isActive: boolean;

    constructor(partial: Partial<ProductEntity>) {
        Object.assign(this, partial);
    }
}
