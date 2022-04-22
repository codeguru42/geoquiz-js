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
}

window.initMap = initMap;
