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
leafletUI.control.zoom = L.Control.extend({
  options: {
    position: 'topleft',
    zoomIn: {
      text: '+',
      title: 'Zoom in'
    },
    zoomOut: {
      text: '-',
      title: 'Zoom out'
    },
    zoom: {
      text: leafletUI.map._zoom,
      title: 'Current zoom'
    }
  },

  onAdd: function (map) {
    var container = L.DomUtil.create('div', 'zoom-control');
    var self = this;
    var createButton = function (opts, callback) {
      var button = L.DomUtil.create('button',
        'mdl-button mdl-js-button mdl-button--raised mdl-button--colored zoom-control-button', container);
      button.innerHTML = opts.text;
      button.title = opts.title;
      if (callback) {
        L.DomEvent.on(button, 'click', callback, self);
      }
      L.DomEvent.disableClickPropagation(button);
      return button;
    }

    this._zoomInButton = createButton(this.options.zoomIn,
            function (e) {
              leafletUI.map.zoomIn(e.shiftKey ? 3 : 1);
            });

    this._zoomOutButton = createButton(this.options.zoomOut,
            function (e) {
              leafletUI.map.zoomOut(e.shiftKey ? 3 : 1);
            });

    this._zoomButton = createButton(this.options.zoom);

    this._onZoomUpdate();
    leafletUI.map.on('zoomend zoomlevelschange', this._onZoomUpdate, this);

    return container;
  },

  _onZoomUpdate: function () {
    this._zoomInButton.removeAttribute('disabled');
    this._zoomOutButton.removeAttribute('disabled');

    if (leafletUI.map._zoom === leafletUI.map.getMinZoom()) {
    this._zoomOutButton.setAttribute('disabled', '');
    }
    if (leafletUI.map._zoom === leafletUI.map.getMaxZoom()) {
    this._zoomInButton.setAttribute('disabled', '');
    }

    this._zoomButton.innerHTML = leafletUI.map._zoom;
  }
});

leafletUI.map.addControl(new leafletUI.control.zoom())
