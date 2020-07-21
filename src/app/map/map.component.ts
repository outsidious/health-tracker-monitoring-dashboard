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
import { icon, latLng, marker, tileLayer, Marker, LatLng, Map } from "leaflet";
import { environment } from "../../environments/environment";
import { MatDialog } from "@angular/material/dialog";
import { MarkersService } from "../marker/markers.service";
import { AlertsService } from "../alert/alert.service";
import { DialogComponent } from "../dialog/dialog.component";
import { SensorsService } from "../sensor/sensors.service";
import { Subscription, timer } from "rxjs";
import { switchMap } from "rxjs/operators";

@Component({
    selector: "app-map",
    templateUrl: "./map.component.html",
    styleUrls: ["./map.component.css"],
})
export class MapComponent implements OnDestroy {
    alert: HTMLAudioElement;
    map: Map;
    vizualMarkers: { [key: string]: Marker } = {};
    markersSubscription: Subscription;
    alertsSubscription: Subscription;
    // Define our base layers so we can reference them multiple times
    streetMaps = tileLayer(environment.maps.street_title, {
        detectRetina: true,
        attribution: environment.maps.attribute,
    });
    wMaps = tileLayer(environment.maps.wiki_title, {
        detectRetina: true,
        attribution: environment.maps.attribute,
    });

    // Layers control object with our two base layers
    layersControl = {
        baseLayers: {
            "Street Maps": this.streetMaps,
            "Wikimedia Maps": this.wMaps,
        },
    };

    // Set the initial set of displayed layers
    options = {
        layers: [this.streetMaps],
        zoom: 3,
        center: latLng([20.0, 50.0]),
    };

    constructor(
        private markerService: MarkersService,
        private alertService: AlertsService,
        private resolver: ComponentFactoryResolver,
        private injector: Injector,
        private dialog: MatDialog,
        private zone: NgZone
    ) {}

    onMapReady(map) {
        this.map = map;
        this.alert = new Audio("/assets/audio/alert.mp3");
        this.alert.src = "/assets/audio/alert.mp3";
        this.alert.load();
        this.getMarkers();
    }

    getMarkers() {
        this.markerService.markersSubject.subscribe((markers) => {
            this.alertService.alertsSubject.subscribe((alerts) => {
                if (alerts.length !== 0) {
                    this.alert.play();
                } else {
                    this.alert.pause();
                }
                let currentTime = new Date().toISOString();
                let currentTimeMseconds = Date.parse(currentTime);
                for (const entry of markers) {
                    let markerTimeMseconds = Date.parse(entry.timeStamp);
                    let markerIconType =
                        environment.markers.marker_available_icon;
                    if (alerts.find((i) => i === entry.deviceId)) {
                        markerIconType = environment.markers.marker_alert_icon;
                    } else if (
                        currentTimeMseconds - markerTimeMseconds >
                        environment.time.online_delay
                    ) {
                        markerIconType =
                            environment.markers.marker_unavailable_icon;
                    }
                    let m = this.getVizualMarkerById(entry.deviceId);
                    if (m) {
                        m.setIcon(
                            icon({
                                iconSize: [25, 41],
                                iconAnchor: [13, 41],
                                iconUrl: markerIconType,
                                shadowUrl: environment.markers.shadow_url,
                            })
                        );
                        m.setLatLng(entry.currentValue);
                    } else {
                        m = marker(entry.currentValue, {
                            icon: icon({
                                iconSize: [25, 41],
                                iconAnchor: [13, 41],
                                iconUrl: markerIconType,
                                shadowUrl: environment.markers.shadow_url,
                            }),
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
        });
        this.markersSubscription = timer(0, environment.time.update_time)
            .pipe(switchMap(() => this.markerService.updateMarkers()))
            .subscribe(() => {});
        this.alertsSubscription = timer(0, environment.time.alerts_update_time)
            .pipe(switchMap(() => this.alertService.updateAlerts()))
            .subscribe(() => {});
    }

    getVizualMarkerById(id) {
        return this.vizualMarkers[id];
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
