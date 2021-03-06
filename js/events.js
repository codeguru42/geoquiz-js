import { countries } from './countries.js';
import { map } from './index.js';

let currCountryIndex = 0;
let polygons = [];
let guessCount = 0;

shuffleArray(countries.features);

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
    const coordinates = country.geometry.coordinates;
    const borders = coordinates.map(coords => coords.map(coordinatesToLatLng));
    drawPolygons(map, borders);
    centerCountry(borders);
}

function centerCountry(borders) {
    const bounds = new google.maps.LatLngBounds();
    borders.forEach(border =>
        border.forEach(points =>
            points.forEach(point => bounds.extend(point))
        )
    );
    map.fitBounds(bounds);
    map.setZoom(.8 * map.getZoom())
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
    guessCount = 0;
    clearInput();
    erasePolygons();
    currCountryIndex++;
    drawCountry(currCountryIndex);
}

function checkAnswer() {
    const answer = document.getElementById("country").value;
    guessCount++;

    const countryName = countries.features[currCountryIndex].properties.ADMIN;
    if (answer.toLowerCase() === countryName.toLowerCase()) {
        alert("You got it right!");
        nextCountry();
    } else {
        if (guessCount === 3) {
            alert(`The correct answer is ${countryName}`)
            nextCountry();
        } else {
            alert("Try again");
        }
    }
}

function clearInput() {
    document.getElementById('country').value = '';
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
    drawCountry(currCountryIndex);
});

export { drawCountry }
