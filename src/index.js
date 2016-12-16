import { accessToken, socketHost, zoomLevel, defaultCenter } from './config';
import io from 'socket.io-client';
import qs from 'query-string';
import {initMarkerRenderer, createMarker, updateMap} from './markerrenderer';
const queryParams = qs.parse(location.search);

const settings = {
  zoom: queryParams.zoom || zoomLevel,
  center: (queryParams.center && queryParams.center.split(',')) || defaultCenter,
};

const socket = io(socketHost);

L.mapbox.accessToken = accessToken;
const map = L.mapbox.map('map', 'mapbox.dark').setView(settings.center, settings.zoom);
const mapBounds = map.getBounds();

// Returns web / mobile
const getMarkerType = type => type.split('.').shift();

initMarkerRenderer(mapBounds, settings.zoom);

map.on('moveend', function (event) {
  const zoom = map.getZoom();
  const swBounds = map.getBounds()._southWest;
  updateMap(zoom, swBounds);
});

map.on('zoom', function () {
  console.log('zoom')
});

socket.on('coords', (marker) => {
  const type = getMarkerType(marker.type);
  const {lat, lng} = marker;
  createMarker(type, lat, lng);
});
