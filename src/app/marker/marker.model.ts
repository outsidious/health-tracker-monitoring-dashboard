import { Component, Input } from "@angular/core";
import { LatLngExpression } from "leaflet";
import { environment } from "../../environments/environment"

export class MarkerModel {
    deviceId: string;
    currentValue: LatLngExpression;
    timeStamp: string;
}

export class Marker {
    deviceId: string;
    currentValue: LatLngExpression;
    timeStamp: string;

    constructor(model: MarkerModel){
        this.deviceId = model.deviceId;
        this.currentValue = model.currentValue;
        this.timeStamp = model.timeStamp;
    }

    isOnline(currentTime, markerTime) {
        let timeDif = currentTime - markerTime;
        return timeDif > environment.time.online_delay;
    }
}
