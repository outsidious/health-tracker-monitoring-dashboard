import { Component, Input } from "@angular/core";

@Component({
    selector: "app-marker",
    template: "marker.component.html",
})
export class MarkerComponent {
    @Input() data;
}
