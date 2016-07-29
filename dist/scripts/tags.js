/*!
 * docker-registry-ui
 * Copyright (C) 2016  Jones Magloire @Joxit
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

riot.tag2('add', '<dialog id="add-tile-server-dialog" class="mdl-dialog"> <h4 class="mdl-dialog__title">Add a new Tile Server to your list ?</h4> <div class="mdl-dialog__content"> <div class="mdl-textfield mdl-js-textfield"> <input class="mdl-textfield__input" type="text" id="tile-server-link"> <label class="mdl-textfield__label" for="tile-server-link">Tile Server URL</label> </div> <span for="tile-server-link">Use leaflet notation eg: http://url/\\{z\\}/\\{x\\}/\\{y\\}.png</span> </div> <div class="mdl-dialog__actions"> <button type="button" class="mdl-button" onclick="leafletUI.addTag.add();">Add</button> <button type="button" class="mdl-button" onclick="leafletUI.addTag.addAndSet();">Set</button> <button type="button" class="mdl-button" onclick="leafletUI.addTag.dialog.close();">Cancel</button> </div> </dialog>', '', '', function(opts) {
    leafletUI.addTag = leafletUI.addTag || {};
    leafletUI.addTag.update = this.update;
    leafletUI.addTag.add = function () {
      if (leafletUI.addTag.tileServerList.value && leafletUI.addTag.tileServerList.value.length > 0) {
        addTileServer(leafletUI.addTag.tileServerList.value);
      }
      leafletUI.addTag.tileServerList.value = '';
      leafletUI.addTag.dialog.close();
    };
    leafletUI.addTag.addAndSet = function () {
      if (leafletUI.addTag.tileServerList.value && leafletUI.addTag.tileServerList.value.length > 0) {
        addTileServer(leafletUI.addTag.tileServerList.value);
        changeTileServer(leafletUI.addTag.tileServerList.value);
        leafletUI.tileServer.layer.setUrl(leafletUI.addTag.tileServerList.value);
      }
      leafletUI.addTag.tileServerList.value = '';
      leafletUI.addTag.dialog.close();
    };
    this.on('updated', function () {
      leafletUI.addTag.dialog = this['add-tile-server-dialog'];
      leafletUI.addTag.tileServerList = this['tile-server-link'];
      componentHandler.upgradeElements(leafletUI.addTag.dialog);
      if (!leafletUI.addTag.dialog.showModal) {
        dialogPolyfill.registerDialog(leafletUI.addTag.dialog);
      }
    });
});


riot.tag2('change', '<dialog id="change-tile-server-dialog" class="mdl-dialog"> <h4 class="mdl-dialog__title">Change your Tile Server ?</h4> <div class="mdl-dialog__content"> <div class="mdl-textfield mdl-js-textfield"> <select class="mdl-textfield__input mdl-textfield__select" name="tile-server-list" id="tile-server-list"> <option each="{url in leafletUI.tileServer.servers}" value="{url}">{url}</option> </select> </div> </div> <div class="mdl-dialog__actions"> <button type="button" class="mdl-button change" onclick="leafletUI.changeTag.change();">Change</button> <button type="button" class="mdl-button overlay" onclick="leafletUI.changeTag.overlay();">Overlay</button> <button type="button" class="mdl-button close" onclick="leafletUI.changeTag.close();">Cancel</button> </div> </dialog>', '', '', function(opts) {
  leafletUI.changeTag = leafletUI.changeTag || {};
    leafletUI.changeTag.update = this.update;
    leafletUI.changeTag.close = function() {
      leafletUI.changeTag.dialog.close();
      leafletUI.changeTag.update();
    };
    leafletUI.changeTag.change = function() {
      var url = leafletUI.changeTag.tileServerList.value;
      changeTileServer(url);
      leafletUI.tileServer.layer.setUrl(url);
      leafletUI.changeTag.close();
    };
    leafletUI.changeTag.overlay = function() {
      var url = leafletUI.changeTag.tileServerList.value;
      localStorage.setItem('tileServerOverlay', JSON.stringify(url));
      leafletUI.tileServer.overlay.setUrl(url);
      leafletUI.changeTag.close();
    }
    leafletUI.changeTag.show = function() {
      leafletUI.changeTag.update();
      if (leafletUI.changeTag.tileServerList) {
        leafletUI.changeTag.tileServerList.value = leafletUI.tileServer.url();
      }
      leafletUI.changeTag.dialog.showModal();
    };
    this.on('updated', function () {
      leafletUI.changeTag.dialog = this['change-tile-server-dialog'];
      leafletUI.changeTag.tileServerList = this['tile-server-list'];
      componentHandler.upgradeElements(leafletUI.changeTag.dialog);
      if (!leafletUI.changeTag.dialog.showModal) {
        dialogPolyfill.registerDialog(leafletUI.changeTag.dialog);
      }
    });
});


riot.tag2('remove', '<dialog id="remove-tile-server-dialog" class="mdl-dialog"> <h4 class="mdl-dialog__title">Remove your Tile Server ?</h4> <div class="mdl-dialog__content"> <div class="mdl-textfield mdl-js-textfield"> <ul class="mdl-list" name="tile-server-remove-list" id="tile-server-remove-list"> <li class="mdl-list__item" each="{url in leafletUI.tileServer.servers}"> <span class="mdl-list__item-primary-content"> <a href="#" onclick="leafletUI.removeTag.removeUrl(\'{url}\');"> <i class="material-icons mdl-list__item-icon">delete</i> </a> <span class="url">{url}</span> </span> </li> </ul> </div> </div> <div class="mdl-dialog__actions"> <button type="button" class="mdl-button overlay" onclick="leafletUI.removeTag.overlay();">Unset overlay</button> <button type="button" class="mdl-button close" onclick="leafletUI.removeTag.close();">Close</button> </div> </dialog>', '', '', function(opts) {
    leafletUI.removeTag = leafletUI.removeTag || {}
    leafletUI.removeTag.update = this.update;
    leafletUI.removeTag.removeUrl = function (url) {
      removeTileServer(url);
      leafletUI.removeTag.update();
    };

    leafletUI.removeTag.close = function () {
      leafletUI.removeTag.dialog.close();
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
    };

    this.on('updated', function () {
      leafletUI.removeTag.dialog = this['remove-tile-server-dialog'];
      leafletUI.removeTag.tileServerList = this['tile-server-remove-list'];
      if (!leafletUI.removeTag.dialog.showModal) {
        dialogPolyfill.registerDialog(leafletUI.removeTag.dialog);
      }
    });
});
