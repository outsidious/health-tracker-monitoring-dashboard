import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { BehaviorSubject } from "rxjs";
import { MarkerComponent } from "../marker/marker.component";
import { map } from "rxjs/operators";
import { of } from "rxjs";

@Injectable({ providedIn: "root" })
export class MarkersService {
    markersSubject = new BehaviorSubject<MarkerComponent[]>([]);

    constructor(private http: HttpClient) {}

    updateMarkers() {
        return this.http
            .get(environment.http.base_url + "sensors/current/location")
            .pipe(
                map((markers: MarkerComponent[]) => {
                    this.markersSubject.next(markers);
                    return of(markers);
                })
            );
    }
}
