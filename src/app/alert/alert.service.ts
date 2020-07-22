import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { of } from "rxjs";

@Injectable({ providedIn: "root" })
export class AlertsService {
    alertsSubject = new BehaviorSubject<Array<string>>([]);

    constructor(private http: HttpClient) {}

    updateAlerts() {
        return this.http
            .get(environment.http.base_url + "sensors/alerts/all")
            .pipe(
                map((markersId: string[]) => {
                    this.alertsSubject.next(markersId);
                    return markersId;
                })
            );
    }
}
