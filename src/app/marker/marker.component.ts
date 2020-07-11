import { Component, Input, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-marker',
  template: 'marker.component.html'
})
export class MarkerComponent {
  @Input() data;
}