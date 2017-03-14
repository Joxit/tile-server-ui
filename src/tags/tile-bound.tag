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
<tile-bound>
  <material-popup name="tile-bound-dialog">
    <div class="material-popup-title">Show/hide tiles bounds ?</div>
    <div class="material-popup-content">
      <material-checkbox name="check-box" onClick="leafletUI.tileBoundTag.toggleBounds();">
        Show tiles bounds.
      </material-checkbox>
    </div>
    <div class="material-popup-action">
      <material-button class="dialog-button" waves-color="rgba(158,158,158,.4)" onclick="leafletUI.tileBoundTag.dialog.close();">Close</material-button>
    </div>
  </material-popup>

  <script type="text/javascript">
    leafletUI.tileBoundTag = leafletUI.tileBoundTag || {};
    leafletUI.tileBoundTag.update = this.update;

    leafletUI.tileBoundTag.toggleBounds = function () {
      if (leafletUI.tileBoundTag.checkBox.checked) {
        leafletUI.tileBoundTag.tileBoundGridLayer.addTo(leafletUI.map);
      } else {
        leafletUI.tileBoundTag.tileBoundGridLayer.remove();
      }
    };
    leafletUI.tileBoundTag.show = function () {
      leafletUI.tileBoundTag.update();
      leafletUI.tileBoundTag.dialog.open();
    };

    leafletUI.tileBoundTag.TileBoundGridLayer = L.GridLayer.extend({
      createTile:function (coords) {
          var tile =  L.DomUtil.create('div', 'tile-bound')
          tile.innerHTML = 'x:' + coords.x + '<br \\>y:' + coords.y + '<br \\>z:' + coords.z;
          var metaBorder = '1px solid #444';
          if (coords.x % 8 == 0) {

          }
          tile.style['border'] = '1px dashed #444';
          tile.style['box-shadow'] = '0 0 1px #fff';
          return tile;
        }
    });

    leafletUI.tileBoundTag.tileBoundGridLayer = new leafletUI.tileBoundTag.TileBoundGridLayer(leafletUI.map);
    this.on('updated', function () {
      leafletUI.tileBoundTag.dialog = this.tags['tile-bound-dialog'];
      leafletUI.tileBoundTag.checkBox = leafletUI.tileBoundTag.dialog.tags['check-box'];
      console.log(this)
    });
  </script>
</tile-bound>