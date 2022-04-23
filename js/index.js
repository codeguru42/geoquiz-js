import { drawCountry } from './events.js';

let map;

function initMap() {
    const startLocation = {
        lat: 39.381266,
        lng: -97.922211
    };
    const styles = [
        {
            featureType: "all",
            elementType: "labels",
            stylers: [
                {visibility: "off"}
            ]
        },
        {
            featureType: "road",
            stylers: [
                {visibility: "off"}
            ]
        }
    ];
    map = new google.maps.Map(document.getElementById("map"), {
        center: startLocation,
        disableDefaultUI: true,
        styles: styles,
        zoom: 5,
    });
    drawCountry(0);
}

window.initMap = initMap;

export { map };
