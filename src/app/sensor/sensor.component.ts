import { Component } from "@angular/core";

@Component({
    selector: "app-sensor",
    template: "sensor.component.html",
})
export class SensorComponent {
    deviceId: string;
    sensorType: string;
    currentValue: any;
    timeStamp: string;
    alertState: boolean;
}
