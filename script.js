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
  zoomControl: true
}).setView([ 48.8552168, 2.3482104 ], 13);

leafletUI.tileServer = {};
leafletUI.tileServer.url = function () {
  return JSON.parse(localStorage.getItem('tileServer'))[0];
}
leafletUI.tileServer.opts = {
  attribution: '&copy; <a href="https://github.com/Joxit">Joxit</a> and your tile server',
  maxZoom: 22,
};
leafletUI.tileServer.layer = L.tileLayer(leafletUI.tileServer.url(),
    leafletUI.tileServer.opts)

leafletUI.tileServer.layer.addTo(leafletUI.map);

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
var changeButton = function () {
  var button = document.querySelector('#change-tile-server-button');
  var dialog = document.querySelector('#change-tile-server-dialog');
  var tileServerList = dialog.querySelector('#tile-server-list');
  if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
  }
  button.addEventListener('click', function () {
    var tileServer = JSON.parse(localStorage.getItem('tileServer'));
    while (0 < tileServerList.children.length) {
      tileServerList.children.item(0).remove();
    }
    if (tileServer) {
      tileServer.forEach(function (elt) {
        console.log(elt)
        var option = document.createElement("option");
        option.nodeValue = elt;
        var textnode = document.createTextNode(elt);
        option.appendChild(textnode);
        tileServerList.appendChild(option);
      })
    }
    // <option value="saturate">saturate</option>
    dialog.showModal();
  });
  dialog.querySelector('.close').addEventListener('click', function () {
    dialog.close();
  });
  dialog.querySelector('.change').addEventListener('click', function () {
    var url = tileServerList.value;
    changeTileServer(url);
    leafletUI.tileServer.layer.setUrl(url);
    dialog.close();
  });
  return button;

}
changeButton();
var addTileServer = function (url) {
  var tileServer = JSON.parse(localStorage.getItem('tileServer'));
  if (!tileServer || !tileServer instanceof Array) {
    tileServer = [];
  }
  if (tileServer.indexOf(url) != -1) {
    return;
  }
  tileServer = [ url ].concat(tileServer);
  localStorage.setItem('tileServer', JSON.stringify(tileServer));
}

var removeTileServer = function (url) {
  var tileServer = JSON.parse(localStorage.getItem('tileServer'));
  if (!tileServer || !tileServer instanceof Array) {
    tileServer = [];
  }
  var index = tileServer.indexOf(url);
  if (index == -1) {
    return;
  }
  tileServer.splice(index, 1);
  localStorage.setItem('tileServer', JSON.stringify(tileServer));
}

var changeTileServer = function (url){
  var tileServer = JSON.parse(localStorage.getItem('tileServer'));
  if (!tileServer || !tileServer instanceof Array) {
    tileServer = [];
  }
  var index = tileServer.indexOf(url);
  if (index == -1) {
    return;
  }
  tileServer.splice(index, 1)
  tileServer = [ url ].concat(tileServer);
  localStorage.setItem('tileServer', JSON.stringify(tileServer));
}
