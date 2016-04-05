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
var mymap = L.map('map', {zoomControl: true}).setView([ 49, 1.2 ], 13);
var tileServer = JSON.parse(localStorage.getItem('tileServer'))[0];
var opts = {
  attribution: '&copy; <a href="https://github.com/Joxit">Joxit</a> and your tile server',
  maxZoom: 22,
};
L.tileLayer(tileServer, opts).addTo(mymap);

var AddButton = L.Control.extend({
  options: {
    position: 'bottomright'
  },

  onAdd: function (map) {
    // create the control container with a particular class name
    var button = L.DomUtil.create('button',
        'mdl-button mdl-js-button mdl-button--fab mdl-button--colored');
    var icon = L.DomUtil.create('i', 'material-icons', button);
    icon.textContent = 'add';
    button.id = 'add-tile-server-button'

    var dialog = document.querySelector('#add-tile-server-dialog');
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
      var input = dialog.querySelector('#tile-server-link');
      if (input.value && input.value.length > 0) {
        addTileServer(input.value);
      }
      input.value = '';
      dialog.close();
    });
    return button;
  }
});

mymap.addControl(new AddButton());

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
