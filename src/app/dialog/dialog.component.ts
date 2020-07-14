import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
	marker_id: string;
	some_data: string;
}

@Component({
	selector: "app-dialog",
	templateUrl: "dialog.component.html",
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
