storeLocator.controller("mapController", function($scope, $state, storesService, localizationManager, Icons) {
    var myLat = 45.9626;
    var myLng = 12.6563;

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat:myLat, lng:myLng},
        zoom : 6
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
        console.log()
        addMarker(myPos,"Tu sei qui!!!","",Icons.userIcon);

    });

    storesService.getAll(
        function(data){
            if(data){
                $scope.pins = data;
                    $scope.pins.forEach(function(store){
                    var storePos = new google.maps.LatLng(store.latitude,store.longitude);
                    addMarker(storePos,store.name,store.guid,Icons.storeIcon);
                });
            }
            else{
                $state.go('login', {id: 'session_expired'});
            }
        }
    );

    function addMarker(pos,title,guid, icon){

        var marker = new google.maps.Marker({
            position: pos,
            map: map,
            title: title,
            guid: guid,
            icon: icon
        });
        google.maps.event.addListener(marker, 'click', function() {
            if(this.guid.length > 1)
                $state.go("details",{id: this.guid} );
        });
    }

    $scope.$on('focusOn',function(event,coords){
        var myPos = new google.maps.LatLng(coords[0],coords[1]);
        map.setZoom(4);
        setTimeout(function(){map.panTo(myPos)},500);
        setTimeout(function(){map.setZoom(10)},1000);

    })
});
