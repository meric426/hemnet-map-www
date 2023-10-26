import { accessToken, socketHost } from './config.js';
import io from 'socket.io-client';

// const socket = io(socketHost);

L.mapbox.accessToken = 'pk.eyJ1IjoibWVyaWM0MjYiLCJhIjoiY2xvNWlxempoMGE0djJ0bnpjNjBjajVqeSJ9.gbJKajzAG7K1CdOVG1hOXg';
const map = L.mapbox.map('map', 'mapbox.dark')
    .setView([61.653860, 16.503246], 6);

const createIcon = (coords) => {
  return L.divIcon({
    className: `property__icon property__icon--${getMarkerType(coords)}`,
    iconSize: [10, 10]
  })
};

// Returns web / mobile
const getMarkerType = (coords) => {
  return coords.type.split('.').shift();
};

setInterval(function(){
  // random latitude between 55 and 68
  // random longitude between 11 and 23

  const latitude = Math.random() * (68 - 55) + 55;
  const longitude = Math.random() * (23 - 11) + 11;

  const coord = {
    lat: latitude,
    lng: longitude,
    type: "purple.purple",
  }

  const marker = L.marker([coord.lat, coord.lng], { icon: createIcon(coord) });
  marker.addTo(map);

  setTimeout(() => {
    map.removeLayer(marker);
  }, 1000 * 2);
}, 50);

setInterval(function(){
  // random latitude between 55 and 68
  // random longitude between 11 and 23

  const latitude = Math.random() * (68 - 55) + 55;
  const longitude = Math.random() * (23 - 11) + 11;

  const coord = {
    lat: latitude,
    lng: longitude,
    type: "orange.orange",
  }

  const marker = L.marker([coord.lat, coord.lng], { icon: createIcon(coord) });
  marker.addTo(map);

  setTimeout(() => {
    map.removeLayer(marker);
  }, 1000 * 2);
}, 50);


setInterval(function(){
  // random latitude between 55 and 68
  // random longitude between 11 and 23

  const latitude = Math.random() * (68 - 55) + 55;
  const longitude = Math.random() * (23 - 11) + 11;

  const coord = {
    lat: latitude,
    lng: longitude,
    type: "green.green",
  }

  const marker = L.marker([coord.lat, coord.lng], { icon: createIcon(coord) });
  marker.addTo(map);

  setTimeout(() => {
    map.removeLayer(marker);
  }, 1000 * 2);
}, 50);

// socket.on('coords', (coord) => {

// });
