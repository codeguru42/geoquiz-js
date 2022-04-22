import { countries } from './countries.js';

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
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: startLocation,
        styles: styles
    });

    const coordinates = countries.features[0].geometry.coordinates;
    console.log("coordinates", coordinates)
    const border = coordinates.map(coords => coords.map(coordinatesToLatLng));
    console.log("border", border)
}

function coordinatesToLatLng(coordinates) {
    return coordinates.map(([lat, lng]) => ({
        lat,
        lng
    }));
}

window.initMap = initMap;

console.log("countries", countries)
