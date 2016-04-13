angular.module('routerApp')
    .controller('detailsController', function($scope, $state, $stateParams){
        $scope.id = $stateParams.id;
        var currentObj = data().getById($stateParams.id);

        $scope.name = currentObj.name;

    });