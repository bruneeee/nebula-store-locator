storeLocator.controller("detailsController", function($scope,$stateParams, storesService) {
    var guid  = $stateParams.id;

    $scope.loaded = false;

    storesService.get(guid,
        function(data){
            if(data){
                $scope.loaded = true;
                $scope.store = data;
            }

        }
);
});
