function initMap() {
    const startLocation = {
        lat: 39.381266,
        lng: -97.922211
    };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: startLocation,
    });
}

window.initMap = initMap;
