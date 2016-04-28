const config = require('./config');
const socket = require('socket.io-client')(config.socketHost);

L.mapbox.accessToken = config.accessToken;
const map = L.mapbox.map('map', 'mapbox.dark')
    .setView([61.653860, 16.503246], 6);

const customIcon = L.divIcon({
  className: 'property__icon',
  iconSize: [10, 10]
});

const setStyles = (coords) => {
  return L.divIcon({
    className: 'property__icon ' + 'property__icon--' + getMarkerType(coords),
    iconSize: [10, 10]
  })
};

const getMarkerType = (coords) => {
  return coords.type.split('.').shift();
};

socket.on('coords', (coord) => {
  const marker = L.marker([coord.lat, coord.lng], { icon: setStyles(coord) });
  marker.addTo(map);

  setTimeout(() => {
    map.removeLayer(marker);
  }, 1000 * 2);
});
