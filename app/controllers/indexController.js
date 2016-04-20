storeLocator.controller("indexController", function($scope, $state, sessionManager) {

    $scope.$on('$stateChangeSuccess', function () {
        $scope.isSessionSet = sessionManager.getCookie() != undefined;
        $scope.isInDetails = $state.$current == 'details';
    });

    $scope.doLogout = function() {
        sessionManager.logout();
        $state.go('login');
    }

});
