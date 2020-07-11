import { Component, OnInit, ComponentFactoryResolver, ComponentRef, Injector, DoCheck, NgZone } from '@angular/core';
import { icon, latLng, marker, tileLayer, Marker, LatLng} from 'leaflet';
import { environment } from '../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { MarkerComponent } from '../marker/marker.component';
import { DataService } from '../marker/data.service';
import {DialogComponent} from "../dialog/dialog.component";

interface MarkerMetaData {
  name: String;
  markerInstance: Marker;
  componentInstance: ComponentRef<MarkerComponent>
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  map;
  markers: MarkerMetaData[] = [];
   // Define our base layers so we can reference them multiple times
  streetMaps = tileLayer(environment.maps.street_title, {
    detectRetina: true,
    attribution: environment.maps.attribute
  });
  wMaps = tileLayer(environment.maps.wiki_title, {
    detectRetina: true,
    attribution: environment.maps.attribute
  });

  constructor(private dataService: DataService, private resolver: ComponentFactoryResolver, private injector: Injector, private dialog: MatDialog, private zone: NgZone){}

  onMapReady(map) {
    // get a local reference to the map as we need it later
    this.map = map;
    this.addMarkers();
  }

  addMarkers() {
    // simply iterate over the array of markers from our data service
    // and add them to the map
    for(const entry of this.dataService.getMarkers()) {
      // dynamically instantiate a HTMLMarkerComponent
      const factory = this.resolver.resolveComponentFactory(MarkerComponent);

      // we need to pass in the dependency injector
      const component = factory.create(this.injector);

      // wire up the @Input() or plain variables (doesn't have to be strictly an @Input())
      component.instance.data = entry;

      // we need to manually trigger change detection on our in-memory component
      // s.t. its template syncs with the data we passed in
      component.changeDetectorRef.detectChanges();


      // create a new Leaflet marker at the given position
      let m = marker(entry.position);

      //add Event Listener for Click to open a new Modal
      m.addEventListener("click", ()=> {
        this.zone.run(() => {this.openExampleDialog();})
      })

      // finally add the marker to the map s.t. it is visible
      m.addTo(this.map);

      // add a metadata object into a local array which helps us
      // keep track of the instantiated markers for removing/disposing them later
      this.markers.push({
        name: entry.name,
        markerInstance: m,
        componentInstance: component
      });
    }
  }

  private openExampleDialog() {
    this.dialog.open(DialogComponent, {
      data: {exampleData: ""},
      width: "auto"
    });
  }

  // Layers control object with our two base layers a nd the two overlay layers
  layersControl = {
    baseLayers: {
      'Street Maps': this.streetMaps,
      'Wikimedia Maps': this.wMaps
    },
  };

  // Set the initial set of displayed layers (we could also use the leafletLayers input binding for this)
  options = {
    layers: [ this.streetMaps ],
    zoom: 8,
    center: latLng([ 46.879966, -121.726909 ])
  };
}