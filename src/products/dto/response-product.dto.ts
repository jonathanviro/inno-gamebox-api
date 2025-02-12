export class ResponseProductDto {
    id: string;
    name: string;
    sku: string;
    stock: number;
    imageUrl?: string;
    deviceId: string;
    isActive: boolean;
    
    constructor(partial: Partial<ResponseProductDto>) {
        Object.assign(this, partial);
    }
}