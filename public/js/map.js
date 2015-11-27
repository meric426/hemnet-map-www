var socket = io('192.168.32.112:4000');

L.mapbox.accessToken = 'pk.eyJ1IjoicGF0cmlrd2licm9uIiwiYSI6ImNpaGhldnJteDAwYTR2dGtxOHZkdWpsY2oifQ.RHt6xn90DI072UEXAEzhWQ';
var map = L.mapbox.map('map', 'mapbox.dark')
    .setView([61.653860, 16.503246], 6);

var customIcon = L.divIcon({
  className: 'property__icon',
  iconSize: [10, 10]
});

socket.on('coords', function (coord) {
  var marker = L.marker([coord.lat, coord.lng], { icon: customIcon});
  marker.addTo(map);

  setTimeout(function () {
    map.removeLayer(marker);
  }, 1000 * 5);
});
