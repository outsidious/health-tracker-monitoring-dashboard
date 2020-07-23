import { Component, OnDestroy, Inject } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SensorVal, SensorModel } from "../sensor/sensor.model";
import { Subscription, timer } from "rxjs";
import { SensorsService } from "../sensor/sensors.service";
import { environment } from "../../environments/environment";
import { switchMap } from "rxjs/operators";

export interface DialogData {
    markerId: string;
    sensorsValues: { key: string; val: SensorVal }[];
}

@Component({
    selector: "app-dialog",
    templateUrl: "dialog.component.html",
    styleUrls: ["./dialog.component.css"],
})
export class DialogComponent implements OnDestroy {
    isLoaded: boolean;
    sensorSubscription: Subscription;

    constructor(
        private sensorsService: SensorsService,
        private dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
        this.updateInfo();
    }

    updateInfo() {
        this.sensorsService.sensorsSubject.subscribe((data) => {
            this.data.sensorsValues = [];
            for (const sensor of data) {
                let dateTimeStamp = new Date(sensor.timeStamp);
                this.data.sensorsValues.push({
                    key: sensor.sensorType,
                    val: {
                        currentValue: sensor.currentValue
                            .toString()
                            .replace(/,/gi, ", "),
                        alertState: sensor.alertState,
                        timeStamp: dateTimeStamp.toLocaleString(),
                    },
                });
            }
            this.isLoaded = false;
        });
        this.sensorSubscription = timer(0, environment.time.sensors_update_time)
            .pipe(
                switchMap(() => this.sensorsService.updateSensorsValues(this.data.markerId))
            )
            .subscribe(() => {
                this.setIsLoadedTrue();
            });
    }

    public close() {
        this.dialogRef.close();
    }

    setIsLoadedTrue() {
        this.isLoaded = true;
    }

    ngOnDestroy() {
        if (this.sensorSubscription) {
            this.sensorSubscription.unsubscribe();
        }
    }
}
