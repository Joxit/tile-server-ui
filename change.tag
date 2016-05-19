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
  <dialog id="change-tile-server-dialog" class="mdl-dialog">
    <h4 class="mdl-dialog__title">Change your Tile Server ?</h4>
    <div class="mdl-dialog__content">
      <div class="mdl-textfield mdl-js-textfield">
        <select class="mdl-textfield__input mdl-textfield__select" name="tile-server-list" id="tile-server-list">
          <option each="{ url in leafletUI.tileServer.servers }" value={url}>{url}</option>
        </select>
      </div>
    </div>
    <div class="mdl-dialog__actions">
      <button type="button" class="mdl-button change" onClick="leafletUI.changeTag.change();">Change</button>
      <button type="button" class="mdl-button overlay" onClick="leafletUI.changeTag.overlay();">Overlay</button>
      <button type="button" class="mdl-button close" onClick="leafletUI.changeTag.close();">Cancel</button>
    </div>
  </dialog>
  <script type="text/javascript">
    leafletUI.changeTag.update = this.update;
    this.on('updated', function () {
      leafletUI.changeTag.dialog = this['change-tile-server-dialog'];
      leafletUI.changeTag.tileServerList = this['tile-server-list'];
      if (!leafletUI.changeTag.dialog.showModal) {
        dialogPolyfill.registerDialog(leafletUI.changeTag.dialog);
      }
    });
  </script>
</change>
