import { Component, OnInit, ComponentFactoryResolver, ComponentRef, Injector, DoCheck, NgZone } from '@angular/core';
import { icon, latLng, marker, tileLayer, Marker, LatLng} from 'leaflet';
import { environment } from '../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { MarkerComponent } from '../marker/marker.component';
import { MarkersService } from '../marker/markers.service';
import {DialogComponent} from "../dialog/dialog.component";
import { Identifiers } from '@angular/compiler';

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

  constructor(private dataService: MarkersService, private resolver: ComponentFactoryResolver, private injector: Injector, private dialog: MatDialog, private zone: NgZone){}

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
      let m = marker(entry.position, {
        icon: icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: environment.markers.icon_url,
          shadowUrl: environment.markers.shadow_url
        })
      });

      m.on('click', () => {this.zone.run(() => {this.handleMarkerClick(entry.id)});})

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

  private handleMarkerClick(MarkerId) {
    let m = this.dataService.getMarkerById(MarkerId);
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {marker_id: m.id, some_data: m.description},
      width: 'auto'
    });
  }

  // Layers control object with our two base layers
  layersControl = {
    baseLayers: {
      'Street Maps': this.streetMaps,
      'Wikimedia Maps': this.wMaps
    },
  };

  // Set the initial set of displayed layers
  options = {
    layers: [ this.streetMaps ],
    zoom: 8,
    center: latLng([ 46.879966, -121.726909 ])
  };
}