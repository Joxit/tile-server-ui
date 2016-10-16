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

  onAdd: function(map) {
    var button = L.DomUtil.create('material-button');
    L.DomUtil.create('i', 'material-icons', button).textContent = 'add';
    button.id = 'add-tile-server-button'
    button.setAttribute('waves-center', true);
    button.setAttribute('rounded', true);
    button.setAttribute('waves-opacity', 0.6);
    button.setAttribute('waves-duration', 600);
    button.setAttribute('shady', true);

    button.addEventListener('click', function() {
      leafletUI.addTag.dialog.showModal();
    });
    return button;
  }
});

leafletUI.map.addControl(new leafletUI.control.add());