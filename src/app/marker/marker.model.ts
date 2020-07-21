import { Component, Input } from "@angular/core";
import { LatLngExpression } from "leaflet";
import { environment } from "../../environments/environment"

export class MarkerModel {
    deviceId: string;
    currentValue: LatLngExpression;
    timeStamp: string;

    static isOnline(currentTime, markerTime) {
        let timeDif = currentTime - markerTime;
        return timeDif > environment.time.online_delay;
    }
}
