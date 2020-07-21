import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { BehaviorSubject } from "rxjs";
import { SensorModel } from "./sensor.model";
import { map } from "rxjs/operators";
import { of } from "rxjs";

@Injectable({ providedIn: "root" })
export class SensorsService {
    sensorsSubject = new BehaviorSubject<SensorModel[]>([]);

    constructor(private http: HttpClient) {}

    updateSensorsValues(id) {
        return this.http
            .get(environment.http.base_url + "sensors/current/all/" + id)
            .pipe(
                map((markers: SensorModel[]) => {
                    this.sensorsSubject.next(markers);
                    return of(markers);
                })
            );
    }
}
