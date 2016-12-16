const PIXI = require('pixi.js');

const colors = {
  green: 0x39aa35,
  blue: 0x1493bc,
  orange: 0xFF6800,
};

const STAGE_WIDTH = window.innerWidth;
const STAGE_HEIGHT = window.innerHeight;

let stage;
let renderer;

export function initMarkerRenderer() {
  renderer = new PIXI.WebGLRenderer(
    STAGE_WIDTH, STAGE_HEIGHT, { antialias: true, transparent: true, resolution: 1 }
  );

  renderer.view.classList.add('marker-canvas');
  stage = new PIXI.Container();
  document.body.appendChild(renderer.view);

  renderer.render(stage)
  animate();
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
  stage.addChild(marker);

  const x = Math.floor(Math.random() * STAGE_WIDTH) + 1;
  const y = Math.floor(Math.random() * STAGE_HEIGHT) + 1;

  marker.beginFill(getColorFromSearchType(color));
  marker.drawCircle(x, y, 5);
  marker.endFill();

  stage.addChild(marker);
  setTimeout(() => {
    marker.destroy();
  }, 2000);
}

function animate() {
  renderer.render(stage);
  requestAnimationFrame(animate);
}
