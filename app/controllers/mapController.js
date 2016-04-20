storeLocator.controller("mapController", function($scope, storesManager,localizationManager) {
    var myLat = 0.0;
    var myLng = 0.0;
    var precision = 8;

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat:myLat, lng:myLng},
        zoom : precision
    });

    localizationManager.getPosition(function(data){
        if(data){
            console.log(data);
            myLat = data.coords.latitude;
            myLng = data.coords.longitude;
            //precision = data.coords.accuracy + 10;

            var myPos = new google.maps.LatLng(myLat,myLng);

            map.setCenter(myPos);
            map.setZoom(4);

            addMarker(myPos,"Tu sei qui!!!");
        }
        else
            console.log(data);

    });

    storesManager.getAll(
        function(data){
            $scope.pins = data;

            $scope.pins.forEach(function(store){
                var storePos = new google.maps.LatLng(store.latitude,store.longitude)
                addMarker(storePos,store.name);
            });
        }
    );

    function addMarker(pos,title){
        var marker = new google.maps.Marker({
            position: pos,
            map: map,
            title: title
        });
    };





});
