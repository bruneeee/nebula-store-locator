storeLocator.controller("loginController", function($scope, $state, sessionManager, loginManager) {

    $scope.submit = function() {
        loginManager.login({
            email:      $scope.email,
            password:   $scope.password
        },
        function(result) {
            if(result) {
                sessionManager.put(result.session, result.session_ttl);
                $state.go('home');
            }
        })
    }
});
