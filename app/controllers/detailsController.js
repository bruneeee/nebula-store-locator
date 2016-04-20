storeLocator.controller("detailsController", function($scope,$stateParams, storesManager) {
    var guid  = $stateParams.id;

    storesManager.get(guid,
        function(data){
            if(data){
                $scope.store = data;
                console.log(data);
            }

        }
);
});
