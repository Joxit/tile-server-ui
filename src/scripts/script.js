/*
 * Copyright (C) 2016  Jones Magloire @Joxit
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var leafletUI = {};

leafletUI.map = L.map('map', {
  zoomControl: false
}).setView([48.8552168, 2.3482104], 13);

leafletUI.tileServer = {};
leafletUI.tileServer.getServers = function(i) {
  try {
    var res = JSON.parse(localStorage.getItem('tileServer'));
    if (res instanceof Array) {
      return i ? res[i] : res;
    }
  } catch (e) {}
  return i ? '' : [];
};
leafletUI.tileServer.servers = leafletUI.tileServer.getServers();
leafletUI.tileServer.url = function() {
  if (leafletUI.tileServer.servers && leafletUI.tileServer.servers.length > 0) {
    return leafletUI.tileServer.servers[0] || '';
  }
  return '';
}

leafletUI.tileServer.overlayUrl = function() {
  var res = localStorage.getItem('tileServerOverlay');
  if ((res instanceof String || typeof res === 'string') && res.match(/^https?:\/\//)) {
    return res;
  } else {
    localStorage.setItem('tileServerOverlay', '');
    return '';
  }
};

leafletUI.tileServer.opts = {
  attribution: '&copy; <a href="https://github.com/Joxit">Joxit</a> and your tile server',
  maxZoom: 22,
};
leafletUI.tileServer.layer = L.tileLayer(leafletUI.tileServer.url(),
  leafletUI.tileServer.opts);

leafletUI.tileServer.overlay = L.tileLayer(leafletUI.tileServer.overlayUrl(),
  leafletUI.tileServer.opts);

leafletUI.tileServer.layer.addTo(leafletUI.map);
leafletUI.tileServer.overlay.addTo(leafletUI.map);

var addTileServer = function(url) {
  var tileServer = leafletUI.tileServer.getServers();
  if (!tileServer || !tileServer instanceof Array) {
    tileServer = [];
  }
  url = url.trim();
  if (tileServer.indexOf(url) != -1) {
    return;
  }
  tileServer.push(url);
  leafletUI.tileServer.servers = tileServer;
  localStorage.setItem('tileServer', JSON.stringify(tileServer));
}

var removeTileServer = function(url) {
  var tileServer = leafletUI.tileServer.getServers()
  if (!tileServer || !tileServer instanceof Array) {
    tileServer = [];
  }
  url = url.trim();
  var index = tileServer.indexOf(url);
  if (index == -1) {
    return;
  }
  tileServer.splice(index, 1);
  leafletUI.tileServer.servers = tileServer;
  localStorage.setItem('tileServer', JSON.stringify(tileServer));
}

var changeTileServer = function(url) {
  var tileServer = leafletUI.tileServer.getServers()
  if (!tileServer || !tileServer instanceof Array) {
    tileServer = [];
  }
  url = url.trim();
  var index = tileServer.indexOf(url);
  if (index == -1) {
    return;
  }
  tileServer.splice(index, 1);
  tileServer = [url].concat(tileServer);
  leafletUI.tileServer.servers = tileServer;
  localStorage.setItem('tileServer', JSON.stringify(tileServer));
}

riot.mount('app');
riot.mount('material-popup');
riot.mount('material-button');
riot.mount('dropdown-menu');
riot.mount('material-snackbar');

riot.compile(function() {});