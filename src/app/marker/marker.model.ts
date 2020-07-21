import { Component, Input } from "@angular/core";
import { LatLngExpression } from "leaflet";

export class MarkerModel {
    deviceId: string;
    currentValue: LatLngExpression;
    timeStamp: string;
}
