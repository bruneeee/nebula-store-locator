
angular.module('routerApp')
    .controller('homeController', function($scope, $state){
        $scope.message = 'Ti trovi in home page';

        $scope.goToContact = function(){
            $state.go('contact');
        };

        $scope.goToFirst = function(){
            $state.go('details', {id:1});
        };

        $scope.list = data().getAll();

    });