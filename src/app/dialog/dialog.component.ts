import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SensorVal } from "../sensor/sensor.component"

export interface DialogData {
    markerId: string;
    sensorNames: string[];
    sensorValues: { [key: string]: SensorVal };
}

@Component({
    selector: "app-dialog",
    templateUrl: "dialog.component.html",
    styleUrls: ["./dialog.component.css"],
})
export class DialogComponent {
    constructor(
        private dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

    public close() {
        this.dialogRef.close();
    }
}
