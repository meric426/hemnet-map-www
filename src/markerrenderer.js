const PIXI = require('pixi.js');
import sphericalmercator from '@mapbox/sphericalmercator';
const Sphericalmercator = new sphericalmercator({
  size: 256
});

const colors = {
  green: 0x39aa35,
  blue: 0x1493bc,
  orange: 0xFF6800,
};

const STAGE_WIDTH = window.innerWidth;
const STAGE_HEIGHT = window.innerHeight;

let stage;
let renderer;
let swBoundsCoords;
let zoomLevel;

const markerArray = [];

export function initMarkerRenderer(bounds, zoom) {
  const sw = bounds._southWest;
  swBoundsCoords = Sphericalmercator.px([sw.lng, sw.lat], zoom);

  zoomLevel = zoom;

  renderer = new PIXI.WebGLRenderer(
    STAGE_WIDTH, STAGE_HEIGHT, { antialias: true, transparent: true, resolution: 1 }
  );

  renderer.view.classList.add('marker-canvas');
  stage = new PIXI.Container();
  document.body.appendChild(renderer.view);

  renderer.render(stage)
  animate();
}

export function updateMap(zoom, swBounds) {
  zoomLevel = zoom;
  swBoundsCoords = Sphericalmercator.px([swBounds.lng, swBounds.lat], zoom);
}

function getColorFromSearchType(type) {
  switch (type) {
    case "mobile":
      return colors.green;
      break;
    case "web":
      return colors.blue;
      break;
    case "objekt":
      return colors.orange;
    break;
  }
}

export function createMarker(color, lat, lng) {
  const marker = new PIXI.Graphics();

  const coords = Sphericalmercator.px([lng, lat], zoomLevel);

  const x = (coords[0] - swBoundsCoords[0]);
  const y = STAGE_HEIGHT - (swBoundsCoords[1] - coords[1]);

  marker.beginFill(getColorFromSearchType(color));
  marker.drawCircle(x, y, 5);
  marker.endFill();
  marker.alpha = 0;

  stage.addChild(marker);

  const markerId = new Date();
  let i = 0;

  markerArray.push({markerId, marker, i});

  setTimeout(() => {
    marker.destroy();
  }, 15000);
}

function animate() {
  renderer.render(stage);

  for (let i = 0; i < markerArray.length; i++) {
    let marker = markerArray[i].marker;
    let counter = markerArray[i].i;

    markerArray[i].i++;

    if (counter < 10) {
      marker.alpha = (counter * 0.10);
    }

    if (counter >= 100) {
      marker.alpha = 1 - ((counter - 100) * 0.01);
    }
  }

  requestAnimationFrame(animate);
}
