export class UserResponseDto {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    isActive: boolean;

    constructor(partial: Partial<UserResponseDto>) {
        Object.assign(this, partial);
    }
}
