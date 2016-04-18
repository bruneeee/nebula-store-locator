storeLocator.controller("mapController", function($scope, storesManager,localizationManager) {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat:43.0, lng:43.0},
        zoom:8
    });
    console.log(localizationManager.getCurrentPosition);
    var lat = localizationManager.getCurrentPosition.value.coords.latitude; console.log(lat);
    var lng = localizationManager.getCurrentPosition.value.coords.longitude;console.log(lng);
    storesManager.getAll(
        function(data){
            $scope.pins = data;

            $scope.pins.forEach(function(store){
                //console.log(store.latitude.toPrecision());
                var marker = new google.maps.Marker({
                    position: {lat: 44.2, lng: 43.1},
                    map: map,
                    title: store.name
                });
            });
        }
    );





});
