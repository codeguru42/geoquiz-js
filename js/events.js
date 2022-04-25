import { countries } from './countries.js';
import { map } from './index.js';

let currCountryIndex = 0;
let polygons = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function drawCountry(countryIndex) {
    const country = countries.features[countryIndex];
    console.log("Country Name", country.properties.ADMIN)
    const coordinates = country.geometry.coordinates;
    const borders = coordinates.map(coords => coords.map(coordinatesToLatLng));
    drawPolygons(map, borders);
    const center = borders[0][0][0];
    map.setCenter(center)
}

function drawPolygons(map, borders) {
    polygons = borders.map(border => {
        const polygon = new google.maps.Polygon({
            paths: border,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
        });
        polygon.setMap(map);
        return polygon;
    });
}

function erasePolygons() {
    polygons.forEach(polygon => polygon.setMap(null));
}

function coordinatesToLatLng(coordinates) {
    return coordinates.map(([lng, lat]) => ({
        lat,
        lng
    }));
}

function nextCountry() {
    erasePolygons();
    currCountryIndex++;
    drawCountry(currCountryIndex);
}

function checkAnswer() {
    const answer = document.getElementById("country").value;

    if (answer.toLowerCase() === countries.features[currCountryIndex].properties.ADMIN.toLowerCase()) {
        alert("You got it right!");
    } else {
        alert("Try again");
    }
}

function onKeyUp(event) {
    if (event.code === "Enter") {
        document.getElementById('check-answer').click();
    }
}

document.getElementById('next-country')
    .addEventListener('click', nextCountry);
document.getElementById('check-answer')
    .addEventListener('click', checkAnswer);
document.getElementById('country')
    .addEventListener('keyup', onKeyUp)
document.addEventListener('load', () => {
    console.log('load');
    drawCountry(currCountryIndex);
});

export { drawCountry }
