storeLocator.controller("detailsController", function($scope,$stateParams, storesManager) {
    var guid  = $stateParams.id;
    console.log(guid);
    storesManager.get(guid,
        function(data){
        //$scope.store = data;
            //console.log(data);
        }
);
});
