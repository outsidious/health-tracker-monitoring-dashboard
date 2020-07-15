import { Injectable } from "@angular/core";
import { LatLngExpression } from "leaflet";
import { of } from "rxjs";

export class Marker {
    id: number;
    name: String;
    description: String;
    position: LatLngExpression;
}

@Injectable()
export class MarkersService {
    markers: Marker[] = [
        {
            id: 1,
            name: "Marker name 1",
            description: "descr 1",
            position: [46.879966, -121.726909],
        },
        {
            id: 2,
            name: "Marker name 2",
            description: "descr 2",
            position: [46.000966, -123.726909],
        },
    ];

    getMarkers() {
        return of(this.markers);
    }

    getMarkerById(id) {
        return this.markers.filter((entry) => entry.id === id)[0];
    }
}
