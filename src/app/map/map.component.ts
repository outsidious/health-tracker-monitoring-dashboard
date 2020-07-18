import {
    Component,
    OnInit,
    ComponentFactoryResolver,
    ComponentRef,
    Injector,
    DoCheck,
    NgZone,
} from "@angular/core";
import { icon, latLng, marker, tileLayer, Marker, LatLng, Map } from "leaflet";
import { environment } from "../../environments/environment";
import { MatDialog } from "@angular/material/dialog";
import { HttpMarkerComponent } from "../marker/http_marker.component";
import { MarkersService } from "../marker/markers.service";
import { DialogComponent } from "../dialog/dialog.component";
import { Subscription, timer } from "rxjs";
import { switchMap } from "rxjs/operators";

@Component({
    selector: "app-map",
    templateUrl: "./map.component.html",
    styleUrls: ["./map.component.css"],
})
export class MapComponent {
    map: Map;
    httpMarkers: HttpMarkerComponent[] = [];
    vizualMarkers: Marker[] = [];
    subscription: Subscription;
    // Define our base layers so we can reference them multiple times
    streetMaps = tileLayer(environment.maps.street_title, {
        detectRetina: true,
        attribution: environment.maps.attribute,
    });
    wMaps = tileLayer(environment.maps.wiki_title, {
        detectRetina: true,
        attribution: environment.maps.attribute,
    });

    constructor(
        private dataService: MarkersService,
        private resolver: ComponentFactoryResolver,
        private injector: Injector,
        private dialog: MatDialog,
        private zone: NgZone
    ) {}

    onMapReady(map) {
        this.map = map;
        this.updateMarkers();
    }

    updateMarkers() {
        this.subscription = timer(0, environment.time.update_time)
            .pipe(switchMap(() => this.dataService.getMarkers()))
            .subscribe((data) => {
                this.httpMarkers = data["locationList"];
                let currentTime = new Date().toISOString();
                let currentTimeMseconds = Date.parse(currentTime);
                for (const entry of this.httpMarkers) {
                    let markerTimeMseconds = Date.parse(entry.timeStamp);
                    let markerIconType = environment.markers.icon_blue_url;
                    if (
                        currentTimeMseconds - markerTimeMseconds >
                        environment.time.online_delay
                    ) {
                        markerIconType = environment.markers.icon_grey_url;
                    }
                    let m = this.getVizualMarkerById(entry.deviceId);
                    if (m != undefined) {
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
                        this.vizualMarkers.push(m);
                    }
                }
            });
    }

    getMarkerById(id) {
        return this.httpMarkers.filter((entry) => entry.deviceId === id)[0];
    }

    getVizualMarkerById(id) {
        return this.vizualMarkers.filter(
            (entry) => entry.options.title === id
        )[0];
    }

    private handleMarkerClick(id) {
        let m = this.getMarkerById(id);
        const dialogRef = this.dialog.open(DialogComponent, {
            data: { markerId: m.deviceId, someData: m.timeStamp },
            width: "auto",
        });
    }

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
}
