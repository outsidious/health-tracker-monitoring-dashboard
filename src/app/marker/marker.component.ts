import { Component, Input } from "@angular/core";
import { LatLngExpression } from "leaflet";

@Component({
    selector: "app-marker",
    template: "marker.component.html",
})
export class MarkerComponent {
    deviceID: String;
    sensorType: String;
    currentValue: LatLngExpression;
}
