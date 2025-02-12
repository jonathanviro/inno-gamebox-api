export class CompanyEntity {
    id: string;
    name: string;
    userId: string;
    isActive: boolean;

    constructor(partial: Partial<CompanyEntity>) {
        Object.assign(this, partial);
    }
}
