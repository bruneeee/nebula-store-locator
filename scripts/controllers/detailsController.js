angular.module('routerApp')
    .controller('detailsController', function($scope, $stateParams, StoresFactory, $state, SessionService){

        $scope.store = {};

        $(document).ready(

                   function () {

                       setTimeout(function () {
                           $("#detailSection").fadeIn(600);

                       }, 500);

                   });

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

        $scope.goToHome = function(){   //<---------------- usa questa per tornare alla home
            $state.go('home', {session: $stateParams.session});
        }
        
        $scope.getStore();

        console.log($scope.store);

        SessionService.allowSession($stateParams.session);
    });