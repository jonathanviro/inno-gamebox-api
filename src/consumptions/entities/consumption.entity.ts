export class ConsumptionEntity {
    id: string;
    invoice: string;
    productId: string;
    amount: number;
    isActive: boolean;
  
    constructor(partial: Partial<ConsumptionEntity>) {
      Object.assign(this, partial);
    }
  }
  