angular.module('routerApp')
    .controller('detailsController', function($scope, $stateParams, $state, StoresFactory){
        $scope.message = 'Ti trovi nella pagina dettagli.';

        $scope.getStore = function(){
            StoresFactory.get($stateParams.session, $stateParams.guid, function(err, result){
                if (err) return console.log("Errore cosa? ", err);
                $scope.store = result;
                console.log("Uo", $scope.store);
            })
        };

        $scope.store = {};
        $scope.getStore();
        console.log($scope.store);

    });