import {
    Component,
    OnInit,
    OnDestroy,
    ComponentFactoryResolver,
    ComponentRef,
    Injector,
    DoCheck,
    NgZone,
} from "@angular/core";
import {
    icon,
    latLng,
    marker,
    tileLayer,
    Marker,
    Map,
    IconOptions,
} from "leaflet";
import { environment } from "../../environments/environment";
import { MatDialog } from "@angular/material/dialog";
import { MarkersService } from "../marker/markers.service";
import { AlertsService } from "../alert/alert.service";
import { DialogComponent } from "../dialog/dialog.component";
import { Subscription, timer, combineLatest } from "rxjs";
import { switchMap } from "rxjs/operators";
import { MarkerObj } from "../marker/marker.model";
import { MarkerModel } from "../marker/marker.model";

@Component({
    selector: "app-map",
    templateUrl: "./map.component.html",
    styleUrls: ["./map.component.css"],
})
export class MapComponent implements OnDestroy {
    alert: HTMLAudioElement;
    map: Map;
    vizualMarkers: { [key: string]: Marker } = {};
    markers: MarkerModel[];
    markersSubscription: Subscription;
    alertsSubscription: Subscription;

    streetMaps = tileLayer(environment.maps.street_title, {
        detectRetina: true,
        attribution: environment.maps.attribute,
    });
    wMaps = tileLayer(environment.maps.wiki_title, {
        detectRetina: true,
        attribution: environment.maps.attribute,
    });

    layersControl = {
        baseLayers: {
            "Street Maps": this.streetMaps,
            "Wikimedia Maps": this.wMaps,
        },
    };

    options = {
        layers: [this.streetMaps],
        zoom: 3,
        center: latLng([20.0, 50.0]),
    };

    constructor(
        private markerService: MarkersService,
        private alertService: AlertsService,
        private dialog: MatDialog,
        private zone: NgZone
    ) {}

    onMapReady(map) {
        this.map = map;
        this.alert = new Audio("/assets/audio/alert.mp3");
        this.alert.src = "/assets/audio/alert.mp3";
        this.alert.load();
        this.markers = [];
        this.UpdateMarkers();
    }

    getUpdates() {
        return combineLatest(
            this.alertService.alertsSubject,
            this.markerService.markersSubject
        );
    }

    UpdateMarkers() {
        this.getUpdates().subscribe((data) => {
            if (data[0].length !== 0) {
                this.alert.play();
            } else {
                this.alert.pause();
            }
            this.renderMarkersArr(data[1]);
            //console.log(this.vizualMarkers);
            let currentTime = Date.parse(new Date().toISOString());
            for (const entry of this.markers) {
                let markerTime = Date.parse(entry.timeStamp);
                let markerIcon = environment.markers.marker_on_icon;
                if (data[0].find((i) => i === entry.deviceId)) {
                    markerIcon = environment.markers.marker_alert_icon;
                } else if (
                    new MarkerObj(entry).isOnline(currentTime, markerTime)
                ) {
                    markerIcon = environment.markers.marker_off_icon;
                }
                let markerSetIcon: IconOptions = {
                    iconSize: [25, 41],
                    iconAnchor: [13, 41],
                    iconUrl: markerIcon,
                    shadowUrl: environment.markers.shadow_url,
                };
                let m = this.vizualMarkers[entry.deviceId];
                if (m) {
                    m.setIcon(icon(markerSetIcon));
                    m.setLatLng(entry.currentValue);
                } else {
                    m = marker(entry.currentValue, {
                        icon: icon(markerSetIcon),
                        title: entry.deviceId,
                    });

                    m.on("click", () => {
                        this.zone.run(() => {
                            this.handleMarkerClick(entry.deviceId);
                        });
                    });

                    m.addTo(this.map);
                    this.vizualMarkers[entry.deviceId] = m;
                }
            }
        });

        this.markersSubscription = timer(0, environment.time.update_time)
            .pipe(switchMap(() => this.markerService.updateMarkers()))
            .subscribe(() => {});
        this.alertsSubscription = timer(0, environment.time.alerts_update_time)
            .pipe(switchMap(() => this.alertService.updateAlerts()))
            .subscribe(() => {});
    }

    private renderMarkersArr(arr) {
        let unique = this.markers.filter(
            (i) => arr.some((j) => j.deviceId === i.deviceId) === false
        );
        this.markers = arr.concat(unique);
        let currentTime = Date.parse(new Date().toISOString());
        let logoutMarkers = [];
        logoutMarkers = this.markers.filter(
            (i) =>
                currentTime - Date.parse(i.timeStamp) >
                environment.time.logout_delay
        );
        logoutMarkers.map((i) => this.deleteLogoutMarkers(i));
    }

    private deleteLogoutMarkers(marker) {
        this.markers = this.markers.filter(
            (i) => i.deviceId !== marker.deviceId
        );
        if (this.vizualMarkers[marker.deviceId]) {
            this.vizualMarkers[marker.deviceId].removeFrom(this.map);
            delete this.vizualMarkers[marker.deviceId];
        }
    }

    private handleMarkerClick(id) {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
                markerId: id,
                sensorValues: [],
            },
            width: "auto",
        });
    }

    ngOnDestroy() {
        if (this.markersSubscription) this.markersSubscription.unsubscribe();
        if (this.alertsSubscription) this.alertsSubscription.unsubscribe();
    }
}
