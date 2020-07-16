import { Component, Input } from "@angular/core";
import { LatLngExpression } from "leaflet";

@Component({
    selector: "app-marker",
    template: "http_marker.component.html",
})
export class HttpMarkerComponent {
    deviceId: String;
    currentValue: LatLngExpression;
    timeStamp: string;
}
 