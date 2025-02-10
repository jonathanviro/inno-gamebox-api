export class UserEntity {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    isActive: boolean;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
