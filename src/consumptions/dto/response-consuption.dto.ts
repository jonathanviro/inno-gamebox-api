export class ResponseConsumptionDto {
    id: string;
    invoice: string;
    productId: string;
    amount: number;
    isActive: boolean;
  
    constructor(partial: Partial<ResponseConsumptionDto>) {
      Object.assign(this, partial);
    }
  }
  