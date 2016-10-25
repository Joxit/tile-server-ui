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
  <material-popup name="add-tile-server-dialog">
    <div class="material-popup-title">Add a new Tile Server to your list ?</div>
    <div class="mdl-dialog__content">
      <material-input name="tile-server-link" placeholder="Tile Server URL"></material-input>
      <span for="tile-server-link">Use leaflet notation eg: http://url/\{z\}/\{x\}/\{y\}.png</span>
    </div>
    <div class="material-popup-action">
      <material-button class="dialog-button" waves-color="rgba(158,158,158,.4)" onclick="leafletUI.addTag.add();">Add</material-button>
      <material-button class="dialog-button" waves-color="rgba(158,158,158,.4)" onclick="leafletUI.addTag.addAndSet();">Set</material-button>
      <material-button class="dialog-button" waves-color="rgba(158,158,158,.4)" onclick="leafletUI.addTag.dialog.close();">Cancel</material-button>
    </div>
  </material-popup>

  <script type="text/javascript">
    leafletUI.addTag = leafletUI.addTag || {};
    leafletUI.addTag.update = this.update;
    leafletUI.addTag.add = function () {
      if (leafletUI.addTag.tileServerList.value && leafletUI.addTag.tileServerList.value.length > 0) {
        addTileServer(leafletUI.addTag.tileServerList.value);
        leafletUI.snackbar(leafletUI.addTag.tileServerList.value + ' has been added.', false);
      } else {
        leafletUI.snackbar('Nothing to add.', false);
      }
      leafletUI.addTag.tileServerList.value = '';
      leafletUI.addTag.dialog.close();
    };
    leafletUI.addTag.addAndSet = function () {
      if (leafletUI.addTag.tileServerList.value && leafletUI.addTag.tileServerList.value.length > 0) {
        addTileServer(leafletUI.addTag.tileServerList.value);
        changeTileServer(leafletUI.addTag.tileServerList.value);
        leafletUI.tileServer.layer.setUrl(leafletUI.addTag.tileServerList.value);
        leafletUI.snackbar(leafletUI.addTag.tileServerList.value + ' has been setted.', false);
      } else {
        leafletUI.snackbar('Nothing to set.', false);
      }
      leafletUI.addTag.tileServerList.value = '';
      leafletUI.addTag.dialog.close();
    };
    this.on('updated', function () {
      leafletUI.addTag.dialog = this.tags['add-tile-server-dialog'];
      leafletUI.addTag.tileServerList = leafletUI.addTag.dialog.tags['tile-server-link'];
    });
  </script>
</add>