import { accessToken, socketHost } from './config';
import io from 'socket.io-client';
import {initMarkerRenderer, createMarker} from './markerrenderer';

const socket = io(socketHost);

L.mapbox.accessToken = accessToken;
const map = L.mapbox.map('map', 'mapbox.dark').setView([61.653860, 16.503246], 6);

// Returns web / mobile
const getMarkerType = type => type.split('.').shift();

initMarkerRenderer();

socket.on('coords', (marker) => {
  const type = getMarkerType(marker.type);
  const {lat, lng} = marker;
  createMarker(type, lat, lng);
});
