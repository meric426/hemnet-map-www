import { accessToken, socketHost } from './config';
import io from 'socket.io-client';
import mapboxgl from 'mapbox-gl';

const socket = io(socketHost);

mapboxgl.accessToken = accessToken;

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v8',
  center: [16.503246, 61.653860],
  zoom: 5,
});
