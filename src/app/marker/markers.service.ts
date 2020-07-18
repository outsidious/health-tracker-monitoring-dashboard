import { Injectable } from "@angular/core";
import { LatLngExpression } from "leaflet";
import { of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { secure_environment } from "../../environments/secure_environment";

@Injectable()
export class MarkersService {
    constructor(private http: HttpClient) {}

    getMarkers() {
        return this.http.get(secure_environment.http.get_locations);
    }
}
