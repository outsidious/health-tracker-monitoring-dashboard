import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { BehaviorSubject } from "rxjs";
import { SensorComponent } from "../sensor/sensor.component";
import { map } from "rxjs/operators";
import { of } from "rxjs";

@Injectable({ providedIn: "root" })
export class SensorsService {
    sensorsSubject = new BehaviorSubject<SensorComponent[]>([]);

    constructor(private http: HttpClient) {}

    updateSensorsValues(id) {
        return of(
            this.http
                .get(environment.http.base_url + "sensors/current/all/" + id)
                .pipe(
                    map((markers: SensorComponent[]) => {
                        console.log(markers);
                        this.sensorsSubject.next(markers);
                    }) 
                ).subscribe((data) => {})
        );
    }
}
