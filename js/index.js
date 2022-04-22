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
        zoom: 5,
        center: startLocation,
        styles: styles
    });

    const coordinates = countries.features[107].geometry.coordinates;
    console.log("coordinates", coordinates)
    const borders = coordinates.map(coords => coords.map(coordinatesToLatLng));
    console.log("border", borders)
    drawPolygons(map, borders);
    const center = borders[6][0][0];
    console.log("center", center)
    map.setCenter(center)
}

function drawPolygons(map, borders) {
    borders.forEach(border => {
        const polygon = new google.maps.Polygon({
            paths: border,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
        });
        polygon.setMap(map);
    });
}

function coordinatesToLatLng(coordinates) {
    return coordinates.map(([lng, lat]) => ({
        lat,
        lng
    }));
}

window.initMap = initMap;

console.log("countries", countries)
