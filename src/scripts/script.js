/*
 * Copyright (C) 2016-2017  Jones Magloire @Joxit
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
});

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
  if (leafletUI.tileServer.servers && leafletUI.tileServer.servers.length > 0 && leafletUI.tileServer.servers[0] && leafletUI.tileServer.servers[0].length > 0) {
    return leafletUI.tileServer.servers[0];
  }
  return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
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
  attribution: '&copy; <a href="https://joxit.github.io/">Joxit</a> and your tile server. <a href="https://joxit.github.io/tile-server-ui">tile-server-ui</a>.',
  maxZoom: 22,
};
leafletUI.tileServer.layer = L.tileLayer(leafletUI.tileServer.url(),
  leafletUI.tileServer.opts);

leafletUI.tileServer.overlay = L.tileLayer(leafletUI.tileServer.overlayUrl(),
  leafletUI.tileServer.opts);

leafletUI.tileServer.layer.addTo(leafletUI.map);
leafletUI.tileServer.overlay.addTo(leafletUI.map);

leafletUI.tileServer.layer.setUrlHistory =
  leafletUI.tileServer.overlay.setUrlHistory = function(url) {
    this.setUrl(url);
    var query = '?';
    if (leafletUI.tileServer.layer._url) {
      query += 'url=' + leafletUI.encodeURI(leafletUI.tileServer.layer._url);
    }
    if (leafletUI.tileServer.overlay._url) {
      query += '&overlay=' + leafletUI.encodeURI(leafletUI.tileServer.overlay._url);
    }
    history.pushState(null, '', query + window.location.hash)
  };

leafletUI.URL_QUERY_PARAM_REGEX = /[&?]url=/;
leafletUI.URL_PARAM_REGEX = /^url=/;
leafletUI.OVERLAY_QUERY_PARAM_REGEX = /[&?]overlay=/;
leafletUI.OVERLAY_PARAM_REGEX = /^overlay=/;

leafletUI.encodeURI = function(url) {
  return url.indexOf('&') < 0 ? window.encodeURI(url) : btoa(url);
};

leafletUI.decodeURI = function(url) {
  return url.startsWith('http') ? window.decodeURI(url) : atob(url);
};

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

leafletUI.getQueryParamFunction = function (queryParamRegex, paramRegex) {
  return function () {
    var search = window.location.search;
    if (queryParamRegex.test(search)) {
      var param = search.split(/^\?|&/).find(function(param) {
        return param && paramRegex.test(param);
      });
      return param ? param.replace(paramRegex, '') : param;
    }
  }
};

leafletUI.getUrlQueryParam = leafletUI.getQueryParamFunction(leafletUI.URL_QUERY_PARAM_REGEX, leafletUI.URL_PARAM_REGEX);
leafletUI.getOverlayQueryParam = leafletUI.getQueryParamFunction(leafletUI.OVERLAY_QUERY_PARAM_REGEX, leafletUI.OVERLAY_PARAM_REGEX);

riot.compile(function() {
  this.onload = function() {
    var url = leafletUI.getUrlQueryParam();
    var overlay = leafletUI.getOverlayQueryParam();
    if (url) {
      try {
        leafletUI.tileServer.layer.setUrl(leafletUI.decodeURI(url));
      } catch (e) {
        console.log(e);
      }
    }
    if (overlay) {
      try {
        leafletUI.tileServer.overlay.setUrl(leafletUI.decodeURI(overlay));
      } catch (e) {
        console.log(e);
      }
    }
    riot.mount('*');
  }
});