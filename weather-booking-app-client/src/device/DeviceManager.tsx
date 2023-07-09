import { Preferences } from '@capacitor/preferences';
import { v4 as uuidv4 } from 'uuid';

interface IDeviceManager {
    deviceId: string | Promise<string>
}

class DeviceManager implements IDeviceManager {
    private static instance: DeviceManager;
    deviceId: string | Promise<string>;

    private constructor() {
        // Prevent direct object creation
        this.deviceId = DeviceManager.getOrCreateDeviceId();
    }

    static getInstance(): DeviceManager {
        if (!DeviceManager.instance) {
            DeviceManager.instance = new DeviceManager();
            DeviceManager.instance.deviceId = DeviceManager.getOrCreateDeviceId()
        }
        return DeviceManager.instance;
    }

    getDeviceId() {
        return this.deviceId;
    }


    static async getOrCreateDeviceId() {
        // Attempt to get existing deviceId

        const existingDeviceId = await Preferences.get({ key: 'deviceId' });

        // If it exists, return it
        if (existingDeviceId.value) {
            return existingDeviceId.value;
        }

        // If it doesn't exist, generate a new UUID and store it
        const newDeviceId = uuidv4();

        await Preferences.set({
            key: 'deviceId',
            value: newDeviceId,
        });

        // Return the new deviceId
        return newDeviceId;
    };
}

export default DeviceManager;
