angular.module('routerApp')
    .controller('detailsController', function($scope, $stateParams, StoresFactory){

        $scope.store = {};

        $scope.getStore = function(){
            StoresFactory.get($stateParams.session, $stateParams.guid, function(err, result){
                if (err) return console.log("Errore cosa? ", err);
                $scope.store = result;
                console.log($scope.store);

            })
        };

        $scope.getState = function (storeObj) {
            return storeObj.address.split(",")[2];
        }
        
        $scope.getStore();

        console.log($scope.store);
    });