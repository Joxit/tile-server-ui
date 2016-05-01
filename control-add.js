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
leafletUI.control = leafletUI.control || {};

leafletUI.control.add = L.Control.extend({
  options: {
    position: 'bottomright'
  },

  onAdd: function (map) {
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
    dialog.querySelector('.add-set').addEventListener('click', function () {
      if (input.value && input.value.length > 0) {
        addTileServer(input.value);
        changeTileServer(input.value);
        leafletUI.tileServer.layer.setUrl(input.value);
      }
      input.value = '';
      dialog.close();
    });
    return button;
  }
});

leafletUI.map.addControl(new leafletUI.control.add());

