import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { AppComponent } from "./app.component";
import { MapComponent } from "./map/map.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MarkerModel } from "./marker/marker.model";
import { DialogComponent } from "./dialog/dialog.component";
import { MarkersService } from "./marker/markers.service";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent, 
        MapComponent, 
        DialogComponent,
    ],
    imports: [
        BrowserModule,
        LeafletModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        HttpClientModule,
    ],
    providers: [MarkersService],
    entryComponents: [DialogComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
