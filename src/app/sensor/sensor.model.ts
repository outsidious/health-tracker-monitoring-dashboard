export class SensorModel {
    deviceId: string;
    sensorType: string;
    currentValue: any;
    timeStamp: string;
    alertState: boolean;
}

export class SensorVal {
    currentValue: string;
    alertState: boolean;
    timeStamp: string;
}
