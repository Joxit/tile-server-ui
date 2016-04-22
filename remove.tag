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
<remove>
<dialog id="remove-tile-server-dialog" class="mdl-dialog">
<h4 class="mdl-dialog__title">Remove your Tile Server ?</h4>
<div class="mdl-dialog__content">
 <div class="mdl-textfield mdl-js-textfield">
  <ul class="mdl-list" name="tile-server-remove-list" id="tile-server-remove-list">
   <li class="mdl-list__item" each="{ url in leafletUI.tileServer.servers }">
    <span class="mdl-list__item-primary-content">
     <a href="#" onClick="leafletUI.removeTag.removeUrl(this);"><i class="material-icons mdl-list__item-icon">delete</i></a>
     <span class="url">{url}</span>
    </span>
   </li>
  </ul>
 </div>
</div>
<div class="mdl-dialog__actions">
 <button type="button" class="mdl-button overlay" onClick="leafletUI.removeTag.overlay();">Unset overlay</button>
 <button type="button" class="mdl-button close" onClick="leafletUI.removeTag.close();">Close</button>
</div>
</dialog> <script type="text/javascript">
leafletUI.removeTag.update = this.update;
leafletUI.removeTag.removeUrl = function (a) {
  removeTileServer(a.parentElement.querySelector(".url").innerText);
  leafletUI.removeTag.update();
};
this.on('updated', function () {
  leafletUI.removeTag.dialog = leafletUI.removeTag.dialog
      || document.querySelector('#remove-tile-server-dialog');
  leafletUI.removeTag.tileServerList = leafletUI.removeTag.tileServerList
      || leafletUI.removeTag.dialog.querySelector('#tile-server-remove-list');
  if (!leafletUI.removeTag.dialog.showModal) {
    dialogPolyfill.registerDialog(leafletUI.removeTag.dialog);
  }
});
</script>
</remove>
