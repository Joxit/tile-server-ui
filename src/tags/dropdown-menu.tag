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
<dropdown-menu>
  <div id="menu-control-container">
    <material-button id="menu-control-button" name="menu-control-button" waves-center="true" rounded="true" waves-opacity="0.6" waves-duration="600">
      <i class="material-icons">more_vert</i>
    </material-button>
    <material-dropdown id="menu-control-dropdown" name="menu-control-dropdown" for="menu-control-button">
      <p onclick="leafletUI.menuTag.onChangeClick();">Change url</p>
      <p onclick="leafletUI.menuTag.onRemoveClick();">Remove url</p>
      <p onclick="leafletUI.menuTag.onTileBoundClick();">Tile Bound</p>
    </material-dropdown>
  </div>
  <script type="text/javascript">
    var self = this;
    leafletUI.menuTag = leafletUI.menuTag || {};
    leafletUI.menuTag.update = this.update;
    leafletUI.menuTag.onChangeClick = function (){
      leafletUI.changeTag.show();
      self.tags['menu-control-dropdown'].close();
    }
    leafletUI.menuTag.onRemoveClick = function (){
      leafletUI.removeTag.show();
      self.tags['menu-control-dropdown'].close();
    }
    leafletUI.menuTag.onTileBoundClick = function (){
      leafletUI.tileBoundTag.show();
      self.tags['menu-control-dropdown'].close();
    }
    this.on('update', function() {
      this['menu-control-button'].onclick = function(){
        self.tags['menu-control-dropdown'].opened ? self.tags['menu-control-dropdown'].close() : self.tags['menu-control-dropdown'].open();
      }
    });
  </script>
</dropdown-menu>