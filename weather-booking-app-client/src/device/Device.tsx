import { Device as D } from '@ionic-native/device/ngx';

class Device {
    private device: D;

    constructor(device: D) {
        this.device = device;
    }

    getDevice() {
        return this.device;
    }
}

export default Device;
