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
<app>
  <add></add>
  <change></change>
  <remove></remove>
  <material-snackbar name='snackbar'></material-snackbar>
  <script>
    this.mixin('rg.router');
    this.router.add({name: 'home', url: '/:z/:lat/:lng'});
    this.router.on('go', state => {
      state = state || {};
      state.params = state.params || {};
      switch (state.name) {
        case 'home':
          {
            var z = isNaN(state.params.z) || state.params.z.length == 0
              ? 13
              : state.params.z;
            var lat = isNaN(state.params.lat) || state.params.lat.length == 0
              ? 48.8552168
              : state.params.lat;
            var lng = isNaN(state.params.lng) || state.params.lng.length == 0
              ? 2.3482104
              : state.params.lng;
            leafletUI.map.setView(L.latLng(lat, lng), z);
          }
          break;
      }
    });
    this.router.on('start', function() {
      if(!this.current) {
        this.go('home');
      }
    });

    leafletUI.map.on('moveend tilelayersload', function () {
      var center = leafletUI.map.getCenter();
      center.z = leafletUI.map.getZoom();
      rg.router.go('home', center);
    });
    var tags = this.tags;
    leafletUI.snackbar = function (message, isError) {
      tags['snackbar'].addToast({'message': message, 'isError': isError});
    };
    this.router.start();
  </script>
</app>
</script>
</app>