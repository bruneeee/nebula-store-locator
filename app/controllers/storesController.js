storeLocator.controller("storesController", function($rootScope, $scope, storesService,localizationManager) {

    var myLat ;
    var myLng ;
    $scope.distances = [];

    localizationManager.getPosition(function(data){
        if(data){
            myLat = data.coords.latitude;
            myLng = data.coords.longitude;
        }
        else{
            myLat = 0;
            myLng = 0;
            console.log("No localizzazione, gg");
        }

    });

    storesService.getAll(
        function(data){
            $scope.stores = data;
            setDistances();
        }
    );

    function setDistances(){
        $scope.stores.forEach(function(x){
            storesService.distance(myLat, myLng, x.latitude, x.longitude,function(res){
                x.distance = res;
            });
        });
    }

    $scope.focus = function (lat,lng){
        $rootScope.$broadcast('focusOn',[lat,lng]);
    };

    $scope.isActive = false;

});

storeLocator.filter('orderObjectBy', function() {
    return function(items, field, reverse) {
        var filtered = [];

        angular.forEach(items, function(item) {
            filtered.push(item);
        });

        filtered.sort(function (a, b) {
            return (a[field] > b[field] ? 1 : -1);
        });

        if(reverse) {
            filtered.reverse();
        }

        return filtered;
    };
});

