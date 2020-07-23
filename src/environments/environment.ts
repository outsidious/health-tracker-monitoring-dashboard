// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    maps: {
        street_title: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        wiki_title: "http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png",
        attribute:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    markers: {
        marker_on_icon: "assets/map/marker-icon.png",
        marker_off_icon: "assets/map/marker-icon-grey.png",
        marker_alert_icon: "assets/map/marker-icon-red.png",
        shadow_url: "assets/map/marker-shadow.png",
    },
    time: {
        online_delay: 20000, //msec
        update_time: 4000, //msec
        alerts_update_time: 2000, //msec
        logout_delay: 40000, //msec
    },
    http: {
        base_url: "https://lg.perf.group/",
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
