storeLocator.controller("storesController", function($rootScope, $scope, storesService) {
    storesService.getAll(
        function(data){
            $scope.stores = data;
        }
);
    $scope.focus = function (lat,lng){
        $rootScope.$broadcast('focusOn',[lat,lng]);
    }

});
