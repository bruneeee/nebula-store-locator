storeLocator.controller("detailsController", function($scope,$stateParams, storesService) {
    var guid  = $stateParams.id;

    storesService.get(guid,
        function(data){
            if(data){
                $scope.store = data;
            }

        }
);
});
