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
leafletUI.control.menu = L.Control.extend({
  options: {
    position: 'topright'
  },

  onAdd: function (map) {
    var container = L.DomUtil.create('div', 'menu-control');
    var self = this;
    var menu = L.DomUtil.create('button', 'mdl-button mdl-js-button mdl-button--icon', container);
    menu.id = 'menu-control-button';
    L.DomUtil.create('i', 'material-icons', menu).innerHTML = 'more_vert';
    L.DomEvent.disableClickPropagation(menu);
    var ul = L.DomUtil.create('ul', 'mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect', container);
    ul.setAttribute('for', 'menu-control-button');
    var addItem = function(id, innerHTML, callback) {
      var item = L.DomUtil.create('li', 'mdl-menu__item', ul);
      item.id = id;
      item.innerHTML = innerHTML;
      item.onclick = callback;
    };
    addItem('change-tile-server-button', 'Change url', leafletUI.changeTag.show)
    addItem('remove-tile-server-button', 'Remove url', leafletUI.removeTag.show)
    return container;
  },

});

leafletUI.map.addControl(new leafletUI.control.menu())
