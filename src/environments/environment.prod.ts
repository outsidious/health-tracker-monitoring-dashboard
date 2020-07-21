export const environment = {
    production: true,
    maps: {
        street_title: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        wiki_title: "http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png",
        attribute:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    markers: {
        marker_available_icon: "assets/map/marker-icon.png",
        marker_unavailable_icon: "assets/map/marker-icon-grey.png",
        marker_alert_icon: "assets/map/marker-icon-red.png",
        shadow_url: "assets/map/marker-shadow.png",
    },
    time: {
        online_delay: 60000, //msec
        update_time: 6000, //msec
        alerts_update_time: 3000, //msec
    },
    http: {
        base_url: "https://lg.perf.group/",
    },
};
