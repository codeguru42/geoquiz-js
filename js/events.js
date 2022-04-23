import { countries } from './countries.js';

function drawCountry(map, countryIndex) {
    const coordinates = countries.features[countryIndex].geometry.coordinates;
    const borders = coordinates.map(coords => coords.map(coordinatesToLatLng));
    drawPolygons(map, borders);
    const center = borders[0][0][0];
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

function nextCountry() {
    console.log("next country")
}

document.getElementById("next-country")
    .addEventListener('click', nextCountry);
document.addEventListener('load', () => {
    console.log('load');
    drawCountry(currCountryIndex);
});

export { drawCountry }
