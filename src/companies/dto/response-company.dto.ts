export class ResponseCompanyDto {
    id: string;
    name: string;
    userId: string;
    isActive: boolean;
  
    constructor(partial: Partial<ResponseCompanyDto>) {
      Object.assign(this, partial);
    }
  }
  