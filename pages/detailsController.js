angular.module('routerApp')
    .controller('detailsController', function($scope, $stateParams, StoresFactory){
        $scope.message = 'Ti trovi nella pagina dettagli.';

        $scope.store = {};

        $scope.getStore = function(){
            StoresFactory.get($stateParams.session, $stateParams.guid, function(err, result){
                if (err) return console.log("Errore cosa? ", err);
                $scope.store = result;
                console.log($scope.store);

            })
        };

        $scope.getStore();
    });