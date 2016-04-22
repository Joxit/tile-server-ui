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
}).setView([ 48.8552168, 2.3482104 ], 13);

leafletUI.tileServer = {};
leafletUI.tileServer.getServers = function (i) {
  try {
    var res = JSON.parse(localStorage.getItem('tileServer'));
    if (res instanceof Array) {
      return i ? res[i] : res;
    }
  } catch (e) {}
  return i ? '' : [];
};
leafletUI.tileServer.servers = leafletUI.tileServer.getServers();
leafletUI.tileServer.url = function () {
  if (leafletUI.tileServer.servers && leafletUI.tileServer.servers.length > 0) {
    return leafletUI.tileServer.servers[0] || '';
  }
  return '';
}

leafletUI.tileServer.overlayUrl = function () {
  return JSON.parse(localStorage.getItem('tileServerOverlay')) || '';
}

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

var AddButton = L.Control.extend({
  options: {
    position: 'bottomright'
  },

  onAdd: function (map) {
    // create the control container with a particular class name
    var button = L.DomUtil.create('button',
        'mdl-button mdl-js-button mdl-button--fab mdl-button--colored');
    var icon = L.DomUtil.create('i', 'material-icons', button);
    var dialog = document.querySelector('#add-tile-server-dialog');
    var input = dialog.querySelector('#tile-server-link');
    icon.textContent = 'add';
    button.id = 'add-tile-server-button'

    if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    button.addEventListener('click', function () {
      dialog.showModal();
    });
    dialog.querySelector('.close').addEventListener('click', function () {
      dialog.close();
    });
    dialog.querySelector('.add').addEventListener('click', function () {
      if (input.value && input.value.length > 0) {
        addTileServer(input.value);
      }
      input.value = '';
      dialog.close();
    });
    return button;
  }
});

leafletUI.map.addControl(new AddButton());

var addTileServer = function (url) {
  var tileServer = leafletUI.tileServer.getServers();
  if (!tileServer || !tileServer instanceof Array) {
    tileServer = [];
  }
  url = url.trim();
  if (tileServer.indexOf(url) != -1) {
    return;
  }
  tileServer = [ url ].concat(tileServer);
  leafletUI.tileServer.servers = tileServer;
  localStorage.setItem('tileServer', JSON.stringify(tileServer));
}

var removeTileServer = function (url) {
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

var changeTileServer = function (url) {
  var tileServer = leafletUI.tileServer.getServers()
  if (!tileServer || !tileServer instanceof Array) {
    tileServer = [];
  }
  url = url.trim();
  var index = tileServer.indexOf(url);
  if (index == -1) {
    return;
  }
  tileServer.splice(index, 1)
  tileServer = [ url ].concat(tileServer);
  leafletUI.tileServer.servers = tileServer;
  localStorage.setItem('tileServer', JSON.stringify(tileServer));
}

leafletUI.changeTag = {}
leafletUI.changeTag.close = function () {
  document.querySelector('#change-tile-server-dialog').close();
  leafletUI.changeTag.update();
};
leafletUI.changeTag.change = function () {
  var url = leafletUI.changeTag.tileServerList.value;
  changeTileServer(url);
  leafletUI.tileServer.layer.setUrl(url);
  leafletUI.changeTag.close();
};
leafletUI.changeTag.overlay = function () {
  var url = leafletUI.changeTag.tileServerList.value;
  localStorage.setItem('tileServerOverlay', JSON.stringify(url));
  leafletUI.tileServer.overlay.setUrl(url);
  leafletUI.changeTag.close();
}
leafletUI.changeTag.show = function () {
  leafletUI.changeTag.update();
  if (leafletUI.changeTag.tileServerList) {
    leafletUI.changeTag.tileServerList.value = leafletUI.tileServer.url();
  }
  leafletUI.changeTag.dialog.showModal();
};

leafletUI.removeTag = {}
leafletUI.removeTag.close = function () {
  document.querySelector('#remove-tile-server-dialog').close();
  leafletUI.removeTag.update();
};

leafletUI.removeTag.show = function () {
  leafletUI.removeTag.update();
  if (leafletUI.removeTag.tileServerList) {
    leafletUI.removeTag.tileServerList.value = leafletUI.tileServer.url();
  }
  leafletUI.removeTag.dialog.showModal();
};

leafletUI.removeTag.overlay = function () {
  localStorage.setItem('tileServerOverlay', '');
  leafletUI.tileServer.overlay.setUrl('');
}

riot.compile(function () {
  riot.mount('change');
  riot.mount('remove');
})
