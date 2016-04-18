storeLocator.controller("storesController", function($scope, storesManager) {
    storesManager.getAll(function(data){
        console.log(data);
    });
});
