export class DeviceEntity {
    id: string;
    name: string;
    site: string;
    macAddress: string;
    deviceType: string;
    eventId: string;
    isActive: boolean;

    constructor(partial: Partial<DeviceEntity>) {
        Object.assign(this, partial);
    }
}
