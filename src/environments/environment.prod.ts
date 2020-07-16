export const environment = {
    production: true,
    maps: {
        street_title: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        wiki_title: "http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png",
        attribute:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    markers: {
        icon_blue_url: "assets/map/marker-icon.png",
        icon_grey_url: "assets/map/marker-icon-grey.png",
        shadow_url: "assets/map/marker-shadow.png",
    },
    time: {
        online_delay: 120000 //msec
    },
};
