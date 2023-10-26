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


// socket.on('coords', (coord) => {

// });
