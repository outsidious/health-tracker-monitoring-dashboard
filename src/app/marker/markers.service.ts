import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { BehaviorSubject } from "rxjs";
import { MarkerModel } from "./marker.model";
import { Marker } from "./marker.model";
import { map } from "rxjs/operators";
import { of } from "rxjs";

@Injectable({ providedIn: "root" })
export class MarkersService {
    markersSubject = new BehaviorSubject<MarkerModel[]>([]);

    constructor(private http: HttpClient) {}

    updateMarkers() {
        return this.http
            .get(environment.http.base_url + "sensors/current/location")
            .pipe(
                map((markers: MarkerModel[]) => {
                    let _markers: Marker[] = [];
                    for (let i = 0; i < markers.length; ++i) {
                        let _marker = new Marker(markers[i]);
                        _markers.push(_marker);
                    }
                    this.markersSubject.next(markers);
                    return _markers;
                })
            );
    }
}
