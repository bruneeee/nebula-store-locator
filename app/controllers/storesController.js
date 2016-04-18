storeLocator.controller("storesController", function($scope, storesManager) {
    storesManager.getAll(
        function(data){
            $scope.stores = data;
        }
);
});
