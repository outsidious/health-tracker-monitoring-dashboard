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
import { Identifiers } from "@angular/compiler";

/*interface MarkerMetaData {
    name: String;
    markerInstance: Marker;
    componentInstance: ComponentRef<MarkerComponent>;
}*/

@Component({
    selector: "app-map",
    templateUrl: "./map.component.html",
    styleUrls: ["./map.component.css"],
})
export class MapComponent {
    map: Map;
    markers: HttpMarkerComponent[] = [];
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
        private zone: NgZone,
    ) {}

    onMapReady(map) {
        this.map = map;
        this.addMarkers();
    }

    addMarkers() {
        this.dataService.getMarkers().subscribe(data => {
            this.markers=data["locationList"];
            //console.log(this.markers);
            let currentTime = new Date().toISOString();
            let currentTimeMseconds = Date.parse(currentTime);
            //console.log(currentTimeMseconds);
            for (const entry of this.markers) {
                let MarkerTimeMseconds = Date.parse(entry.timeStamp);
                //console.log(MarkerTimeMseconds);
                let m = marker(entry.currentValue, {
                    icon: icon({
                        iconSize: [25, 41],
                        iconAnchor: [13, 41],
                        iconUrl: environment.markers.icon_url,
                        shadowUrl: environment.markers.shadow_url,
                    }),
                });

                m.on("click", () => {
                    this.zone.run(() => {
                        this.handleMarkerClick(entry.deviceId);
                    });
                });

    
                // finally add the marker to the map s.t. it is visible
                m.addTo(this.map); 
    
                // add a metadata object into a local array which helps us
                // keep track of the instantiated markers for removing/disposing them later
            }
        });
    }


    getMarkerById(id) { 
        return this.markers.filter((entry) => entry.deviceId === id)[0];
    }

    private handleMarkerClick(id) {
        let m = this.getMarkerById(id);
        const dialogRef = this.dialog.open(DialogComponent, {
            data: { marker_id: m.deviceId, some_data: m.currentValue },
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
        center: latLng([20.000, 50.000]),
    };
}
