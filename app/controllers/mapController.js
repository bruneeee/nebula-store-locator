storeLocator.controller("mapController", function($scope,$state, storesManager,localizationManager) {
    var myLat = 45.9626;
    var myLng = 12.6563;
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

        }
        else{
            console.log("No localizzazione, gg");
        }
        var myPos = new google.maps.LatLng(myLat,myLng);

        map.setCenter(myPos);
        map.setZoom(4);

        addMarker(myPos,"Tu sei qui!!!");
    });

    storesManager.getAll(
        function(data){
            if(data){
                $scope.pins = data;
                    $scope.pins.forEach(function(store){
                    var storePos = new google.maps.LatLng(store.latitude,store.longitude);
                    addMarker(storePos,store.name,store.guid);
                });
            }
        }
    );

    function addMarker(pos,title,guid){
        var marker = new google.maps.Marker({
            position: pos,
            map: map,
            title: title,
            guid:guid
        });
        google.maps.event.addListener(marker, 'click', function() {
            $state.go("details",{id: this.guid} );
            //$state.go("home");
        });
    }

});
