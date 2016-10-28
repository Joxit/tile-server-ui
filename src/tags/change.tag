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
<change>
  <material-popup name="change-tile-server-dialog">
    <div class="material-popup-title">Change your Tile Server ?</div>
    <div class="mdl-dialog__content">
      <div class="mdl-textfield mdl-js-textfield">
        <select class="mdl-textfield__input mdl-textfield__select" name="tile-server-list" id="tile-server-list">
          <option each="{ url in leafletUI.tileServer.servers }" value={url}>{url}</option>
        </select>
      </div>
    </div>
    <div class="material-popup-action">
      <material-button class="dialog-button" waves-color="rgba(158,158,158,.4)" onclick="leafletUI.changeTag.change();">Change</material-button>
      <material-button class="dialog-button" waves-color="rgba(158,158,158,.4)" onclick="leafletUI.changeTag.overlay();">Overlay</material-button>
      <material-button class="dialog-button" waves-color="rgba(158,158,158,.4)" onclick="leafletUI.changeTag.close();">Cancel</material-button>
    </div>
  </material-popup>
  <script type="text/javascript">
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
      leafletUI.changeTag.dialog.open();
    };
    this.on('updated', function () {
      leafletUI.changeTag.dialog = this.tags['change-tile-server-dialog'];
      leafletUI.changeTag.tileServerList = leafletUI.changeTag.dialog['tile-server-list'];
    });
  </script>
</change>
