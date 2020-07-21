import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SensorVal, SensorModel } from "../sensor/sensor.component"
import { Subscription, timer } from "rxjs";
import { SensorsService } from "../sensor/sensors.service";

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
    isLoaded: boolean;
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
            this.isLoaded = false;
        });
        this.sensorsService.updateSensorsValues(this.data.markerId).subscribe(() => { this.setIsLoadedTrue() });
    }

    public close() {
        this.dialogRef.close();
    }

    setIsLoadedTrue() {
        this.isLoaded = true;
    }
}
