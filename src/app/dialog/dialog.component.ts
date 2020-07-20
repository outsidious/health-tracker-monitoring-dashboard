import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SensorVal, SensorComponent } from "../sensor/sensor.component"
import { Subscription, timer } from "rxjs";
import { SensorsService } from "../sensor/sensors.service";
import { MarkerComponent } from '../marker/marker.component';

export interface DialogData {
    markerId: string;
    sensorsValues: {key: string, val: SensorVal}[];
}

@Component({
    selector: "app-dialog",
    templateUrl: "dialog.component.html",
    styleUrls: ["./dialog.component.css"],
})
export class DialogComponent {
    sensorSubscription: Subscription;

    constructor(
        private sensorsService: SensorsService,
        private dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { this.updateInfo(); }

    updateInfo() {
        this.sensorsService.sensorsSubject.subscribe((data) => {
            this.data.sensorsValues = [];
            for (const sensor of data) {
                this.data.sensorsValues.push({key: sensor.sensorType, val: {currentValue: sensor.currentValue, alertState: sensor.alertState}});
            }
        });
    }

    public close() {
        this.dialogRef.close();
    }

    hack(val) {
        return Array.from(val);
    }
}
