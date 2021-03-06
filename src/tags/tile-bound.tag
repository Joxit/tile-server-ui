<!--
 Copyright (C) 2016-2017  Jones Magloire @Joxit

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
      <material-checkbox class="margin-8" name="check-box">
        Show tiles bounds.
      </material-checkbox>
      <div class="on-line margin-8">
        <material-checkbox name="meta-check-box">
        </material-checkbox>
        <material-input name="meta-tile-size" value="{leafletUI.tileBoundTag.metaTileSize.value}" valid="/^\d*$/" label="Meta Tiles size"></material-input>
      </div>
    </div>
    <div class="material-popup-action">
      <material-button class="dialog-button" waves-color="rgba(158,158,158,.4)" onclick="leafletUI.tileBoundTag.dialog.close();">Close</material-button>
    </div>
  </material-popup>

  <script type="text/javascript">
    leafletUI.tileBoundTag = leafletUI.tileBoundTag || {};
    leafletUI.tileBoundTag.update = this.update;

    leafletUI.tileBoundTag.toggleBounds = function (checked) {
      if (checked) {
        leafletUI.tileBoundTag.tileBoundGridLayer.addTo(leafletUI.map);
      } else {
        leafletUI.tileBoundTag.tileBoundGridLayer.remove();
      }
      localStorage.setItem('tileBounds', checked);
    };
    leafletUI.tileBoundTag.toggleMetaBounds = function (checked) {
      if (checked) {
        leafletUI.tileBoundTag.metaTileBoundGridLayer.addTo(leafletUI.map);
      } else {
        leafletUI.tileBoundTag.metaTileBoundGridLayer.remove();
      }
      localStorage.setItem('metaTileBounds', checked);
    };
    leafletUI.tileBoundTag.show = function () {
      leafletUI.tileBoundTag.update();
      leafletUI.tileBoundTag.dialog.open();
    };

    leafletUI.tileBoundTag.TileBoundGridLayer = L.GridLayer.extend({
      createTile:function (coords) {
          var tile =  L.DomUtil.create('div', 'tile-bound');
          tile.innerHTML = 'x:' + coords.x + '<br \\>y:' + coords.y + '<br \\>z:' + coords.z;
          tile.style['border'] = '1px dashed #444';
          tile.style['box-shadow'] = '0 0 1px #fff';
          return tile;
        }
    });

    leafletUI.tileBoundTag.MetaTileBoundGridLayer = L.GridLayer.extend({
      createTile:function (coords) {
          if (!leafletUI.tileBoundTag.metaTileSize.value || isNaN(leafletUI.tileBoundTag.metaTileSize.value.length)) {
            return L.DomUtil.create('div', 'meta-tile-bound');
          }
          var metaTileSize = leafletUI.tileBoundTag.metaTileSize.value;
          var borderStyle = '2px dotted #a44'
          var tile =  L.DomUtil.create('div', 'meta-tile-bound');
          if (coords.x % metaTileSize == 0) {
            tile.style['border-left'] = borderStyle;
          }
          if (coords.x % metaTileSize == (metaTileSize - 1)) {
            tile.style['border-right'] = borderStyle;
          }
          if (coords.y % metaTileSize == 0) {
            tile.style['border-top'] = borderStyle;
          }
          if (coords.y % metaTileSize == (metaTileSize - 1)) {
            tile.style['border-bottom'] = borderStyle;
          }
          return tile;
        }
    });

    leafletUI.tileBoundTag.tileBoundGridLayer = new leafletUI.tileBoundTag.TileBoundGridLayer(leafletUI.map);
    leafletUI.tileBoundTag.metaTileBoundGridLayer = new leafletUI.tileBoundTag.MetaTileBoundGridLayer(leafletUI.map);
    this.on('mount', function () {
      leafletUI.tileBoundTag.dialog = this.tags['tile-bound-dialog'];
      leafletUI.tileBoundTag.checkBox = leafletUI.tileBoundTag.dialog.tags['check-box'];
      leafletUI.tileBoundTag.metaCheckBox = leafletUI.tileBoundTag.dialog.tags['meta-check-box'];
      leafletUI.tileBoundTag.metaTileSize = leafletUI.tileBoundTag.dialog.tags['meta-tile-size'];
      leafletUI.tileBoundTag.dialog['meta-tile-size'].onkeypress = function (event) {
        if (event.key !== 'Enter') {
          return;
        }
        if(!leafletUI.tileBoundTag.metaCheckBox.checked) {
          leafletUI.tileBoundTag.metaCheckBox.checked = true;
          leafletUI.tileBoundTag.metaCheckBox.update();
          leafletUI.tileBoundTag.toggleMetaBounds(true);
        } else {
          leafletUI.tileBoundTag.metaTileBoundGridLayer.redraw();
        }
      };
      var tileBounds = localStorage.getItem('tileBounds');
      if (tileBounds == 'true') {
        leafletUI.tileBoundTag.checkBox.checked = true;
        leafletUI.tileBoundTag.toggleBounds(true);
      }
      var metaTileSize = localStorage.getItem('metaTileSize');
      if (!isNaN(metaTileSize)) {
        leafletUI.tileBoundTag.metaTileSize.value = metaTileSize;
        leafletUI.tileBoundTag.metaTileSize.update();
      }
      var metaTileBounds = localStorage.getItem('metaTileBounds');
      if (metaTileBounds == 'true') {
        leafletUI.tileBoundTag.metaCheckBox.checked = true;
        leafletUI.tileBoundTag.toggleMetaBounds(true);
      }
      leafletUI.tileBoundTag.checkBox.on('toggle', leafletUI.tileBoundTag.toggleBounds);
      leafletUI.tileBoundTag.metaCheckBox.on('toggle', leafletUI.tileBoundTag.toggleMetaBounds);
      leafletUI.tileBoundTag.metaTileSize.on('valueChanged', function () {
        if(leafletUI.tileBoundTag.metaCheckBox.checked) {
          leafletUI.tileBoundTag.metaTileBoundGridLayer.redraw();
        }
        localStorage.setItem('metaTileSize', leafletUI.tileBoundTag.metaTileSize.value);
      });
    });
  </script>
</tile-bound>