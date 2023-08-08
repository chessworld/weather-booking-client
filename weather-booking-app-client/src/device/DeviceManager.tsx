import { Preferences } from '@capacitor/preferences';
import UserEndpoint from "../endpoint-caller/userEndpoint";

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


    static async updateDeviceId(newDeviceId?: string) {
        await Preferences.set({
            key: 'deviceId',
            value: newDeviceId ?? '',
        });
    }

    static async getOrCreateDeviceId(): Promise<string> {
        // Attempt to get existing deviceId
        const existingDeviceId = await Preferences.get({ key: 'deviceId' });

        if (existingDeviceId.value) {
            // User Already exists
            return existingDeviceId.value;
        }


        // If no device id create a new user
        UserEndpoint.createUser("New User", false) //TODO: CHANGE THIS FROM HARDCODED
            .then((user) => {
                // If user doesn't exist
                this.updateDeviceId(user.id);
                return user.id
            })
            .catch((error) => {
                console.error(error);
            });

        throw new Error('DeviceId not found');
    };

    static async checkUserCompletedTutorial(): Promise<boolean> {
        this.getOrCreateDeviceId().then((deviceId: string) => {
            UserEndpoint.getUser(deviceId)
                .then((user) => {
                    // User Already exists
                    if (!user.completed_tutorial) {
                        // If user exists but hasn't completed tutorial
                        return false;
                    }

                    return true;
                })
                .catch((error) => {
                    console.error(error);
                });
        });

        return true;
    }
};

export default DeviceManager;
