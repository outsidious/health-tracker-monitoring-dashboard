import { Component, Input, OnInit } from '@angular/core';
import { MarkersService } from './markers.service';

@Component({
  selector: 'app-marker',
  template: 'marker.component.html'
})
export class MarkerComponent {
  @Input() data;
}