import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class SensorsService {
    constructor(private http: HttpClient) {}

    getSensorsValues(id) {
        return this.http.get(environment.http.base_url + "sensors/current/all/" + id);
    }
}