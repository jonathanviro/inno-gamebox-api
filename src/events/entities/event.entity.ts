export class EventEntity {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    companyId: string;
    isActive: boolean;

    constructor(partial: Partial<EventEntity>) {
        Object.assign(this, partial);
    }
}
