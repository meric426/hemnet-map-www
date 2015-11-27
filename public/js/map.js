mapboxgl.accessToken = 'pk.eyJ1IjoicGF0cmlrd2licm9uIiwiYSI6ImNpaGhld3JidDAwOXZ2a205Y3puems0MG8ifQ.fRIZxQrmaWG45atGisIrGQ';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v8',
    center: [18.065818, 59.338675], // starting position
    zoom: 5 // starting zoom
});
