<!--
 Copyright (C) 2016  Jones Magloire @Joxit

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->
<add>
  <dialog id="add-tile-server-dialog" class="mdl-dialog">
    <h4 class="mdl-dialog__title">Add a new Tile Server to your list ?</h4>
    <div class="mdl-dialog__content">
      <div class="mdl-textfield mdl-js-textfield">
        <input class="mdl-textfield__input" type="text" id="tile-server-link">
        <label class="mdl-textfield__label" for="tile-server-link">Tile Server URL</label>
      </div>
      <span for="tile-server-link">Use leaflet notation eg: http://url/\{z\}/\{x\}/\{y\}.png</span>
    </div>
    <div class="mdl-dialog__actions">
      <button type="button" class="mdl-button" onclick="leafletUI.addTag.add();">Add</button>
      <button type="button" class="mdl-button" onclick="leafletUI.addTag.addAndSet();">Set</button>
      <button type="button" class="mdl-button" onclick="leafletUI.addTag.dialog.close();">Cancel</button>
    </div>
  </dialog>

  <script type="text/javascript">
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
  </script>
</add>
