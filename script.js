var mymap = L.map('map').setView([ 49, 1.2 ], 13);
var tileServer = '';
var attributions = '';
L.tileLayer(tileServer, {
  attribution: attributions,
  maxZoom: 22,
}).addTo(mymap);
