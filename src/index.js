import { accessToken, socketHost } from "./config.js";
import { io } from "socket.io-client";

const socket = io.connect(socketHost);

L.mapbox.accessToken = accessToken;
const map = L.mapbox.map("map", "mapbox.dark")
    .setView([61.653860, 16.503246], 6);

const typeToColor = {
  "sold": "orange",
  "for_sale": "green",
  "upcoming": "purple",
};

const createIcon = (type) => {
  const color = typeToColor[type];

  return L.divIcon({
    className: `property__icon property__icon--${color}`,
    iconSize: [10, 10]
  })
};

socket.on('new_search', (data) => {
  if (data && data.coords && data.coords.length > 0) {
    data.coords.forEach((coord) => {
      const marker = L.marker([coord.lat, coord.lng], { icon: createIcon(data.type) });
      marker.addTo(map);

      setTimeout(() => {
        map.removeLayer(marker);
      }, 1000 * 1);
    });
  }
});
