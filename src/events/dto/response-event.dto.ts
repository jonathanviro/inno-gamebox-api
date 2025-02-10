export class ResponseEventDto {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  companyId: string;
  isActive: boolean;

  constructor(partial: Partial<ResponseEventDto>) {
    Object.assign(this, partial);
  }
}
