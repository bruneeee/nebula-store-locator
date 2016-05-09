storeLocator.controller("storesController", function($rootScope, $scope, $state, storesService,localizationManager) {
    
    var myLat ;
    var myLng ;
    $scope.distances = [];
    $scope.loaded = false;

    localizationManager.getPosition(function(data){
        if(data){
            myLat = data.coords.latitude;
            myLng = data.coords.longitude;
        }
        else{
            myLat = 0;
            myLng = 0;
        }

    });

    storesService.getAll(
        function(data){
            if(data){
                $scope.stores = data;
                $scope.loaded = true;
                setDistances();
            }
            else{
                $state.go('login', {id: 'external_error'});
            }
        }
    );

    function setDistances(){
        $scope.stores.forEach(function(x){
            storesService.distance(myLat, myLng, x.latitude, x.longitude, function(res){
                x.distance = !isNaN(res) ? parseInt(res) : "";
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

