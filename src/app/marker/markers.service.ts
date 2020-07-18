import { Injectable } from "@angular/core";
import { LatLngExpression } from "leaflet";
import { of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable()
export class MarkersService {
    constructor(private http: HttpClient) {}

    getMarkers() {
        return this.http.get(environment.http.base_url + "sensors/current/location");
    }
}
