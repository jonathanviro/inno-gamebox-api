export class ResponseUserDto {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    isActive: boolean;

    constructor(partial: Partial<ResponseUserDto>) {
        Object.assign(this, partial);
    }
}
