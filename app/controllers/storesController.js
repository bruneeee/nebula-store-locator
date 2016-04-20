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
            gg();
        }
);
    function gg(){
        for(var i=0;i < $scope.stores.length;i++){

            storesService.distance(myLat,myLng,$scope.stores[i].latitude,$scope.stores[i].longitude,function(res){
                $scope.stores[i].distance = res;
                //console.log(res);
            });
        }
    }

    $scope.focus = function (lat,lng){
        $rootScope.$broadcast('focusOn',[lat,lng]);
    }

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
        if(reverse) filtered.reverse();
        return filtered;
    };
});

