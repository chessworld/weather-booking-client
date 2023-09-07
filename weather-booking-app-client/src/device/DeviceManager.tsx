import { Preferences } from "@capacitor/preferences";
import UserEndpoint from "../endpoint-caller/userEndpoint";

interface IDeviceManager {
    deviceUserId: string;
}

/**
 * Singleton class responsible for device management tasks such as 
 * retrieving and updating the device"s user ID, checking if the user has completed a tutorial, and more.
 */
class DeviceManager implements IDeviceManager {
    private static instance: DeviceManager;
    deviceUserId: string;
    userCompletedTutorial: boolean | undefined;

    /**
      * Private constructor ensures the singleton nature of the class.
      */
    private constructor() {
        this.deviceUserId = "";
    }

    /**
     * Initializes the DeviceManager by setting the device user ID.
     * Throws an error if unable to initialize the user ID.
     */
    private async initialize(): Promise<void> {
        this.deviceUserId = await this.getDeviceId() ?? await this.createDeviceId();

        if (!this.deviceUserId) {
            throw new Error("Unable to initialize deviceUserId");
        }

        console.log("Device ID: ", this.deviceUserId);
    }

    /**
     * Returns an instance of DeviceManager. If it doesn"t exist, it creates one.
     * 
     * @returns {Promise<DeviceManager>} The instance of the DeviceManager.
     */
    static async getInstance(): Promise<DeviceManager> {
        if (!DeviceManager.instance) {
            DeviceManager.instance = new DeviceManager();
            await DeviceManager.instance.initialize();
        }

        return DeviceManager.instance;
    }

    /**
     * Retrieves the device"s user ID.
     * 
     * @returns {Promise<string | void>} The device"s user ID or void if it doesn"t exist.
     */
    async getDeviceId(): Promise<string | void> {
      
        if (this.deviceUserId) {
            return this.deviceUserId;
        }

        const deviceId = await Preferences.get({ key: "deviceId" });

        if (deviceId.value && await this.checkDeviceIdExists(deviceId.value)) {
            return deviceId.value;
        }
    }

    /**
      * Creates a new device user ID by calling the UserEndpoint.
      * 
      * @returns {Promise<string>} The newly created device"s user ID.
      * @throws {Error} If unable to create a new device ID.
      */
    async createDeviceId(): Promise<string> {
        const username = "New User";
        const user = await UserEndpoint.createUser(username, false);

        if (user.id) {
            if (!user.id) {
                throw new Error("Invalid userId provided to updateDeviceId");
            }

            await Preferences.set({
                key: "deviceId",
                value: user.id,
            });
        }

        throw new Error("Failed to create a new device ID");
    }

    /**
     * Checks if the given device ID exists on the server.
     * Note: Currently always returns true (based on provided code).
     * 
     * @param {string} deviceId - The device ID to check.
     * @returns {Promise<boolean>} True if the device ID exists, false otherwise.
     */
    private async checkDeviceIdExists(deviceId: string): Promise<boolean> {
        if (!deviceId) {
            return false;
        }

        return true;
    }

    /**
     * Attempts to mark the user as having completed the tutorial.
     * 
     * @returns {Promise<boolean>} True if the tutorial completion was recorded successfully, false otherwise.
     */
    async setUserCompletedTutorial(): Promise<boolean> {
        try {
            const response = await UserEndpoint.completeUserTutorial(this.deviceUserId);
            this.userCompletedTutorial = response.completed_tutorial;
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Checks if the user has completed the tutorial.
     * 
     * @returns {Promise<boolean>} True if the user has completed the tutorial, false otherwise.
     * @throws {Error} If there"s a failure in checking the tutorial status.
     */
    async checkUserCompletedTutorial(): Promise<boolean> {
        try {
            const user = await UserEndpoint.getUser(this.deviceUserId);
            return user.completed_tutorial;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to check if user completed tutorial");
        }
    }
}

export default DeviceManager;
