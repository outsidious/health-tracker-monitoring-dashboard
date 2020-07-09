import { Component } from '@angular/core';
import { icon, latLng, marker, tileLayer } from 'leaflet';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
   // Define our base layers so we can reference them multiple times
  streetMaps = tileLayer(environment.maps.street_title, {
    detectRetina: true,
    attribution: environment.maps.attribute
  });
  wMaps = tileLayer(environment.maps.wiki_title, {
    detectRetina: true,
    attribution: environment.maps.attribute
  });

  // First Marker
  summit = marker([ 46.8523, -121.7603 ], {
    icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  });

  // Second Marker
  paradise = marker([ 46.78465227596462,-121.74141269177198 ], {
    icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  });


  // Layers control object with our two base layers a nd the two overlay layers
  layersControl = {
    baseLayers: {
      'Street Maps': this.streetMaps,
      'Wikimedia Maps': this.wMaps
    },
    overlays: {
      'First': this.summit,
      'Second': this.paradise,
    }
  };


  // Set the initial set of displayed layers (we could also use the leafletLayers input binding for this)
  options = {
    layers: [ this.streetMaps, this.summit, this.paradise ],
    zoom: 8,
    center: latLng([ 46.879966, -121.726909 ])
  };
}