storeLocator.controller("storesController", function($scope, storesService) {
    storesService.getAll(
        function(data){
            $scope.stores = data;
        }
);
});
