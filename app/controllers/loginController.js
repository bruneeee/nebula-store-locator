storeLocator.controller("loginController", function($scope, $state, sessionManager) {

    if(!sessionManager.getCookie()) {
        $scope.submit = function() {
            sessionManager.login({
                    email:      $scope.email,
                    password:   $scope.password
                },
                function(result) {
                    if(result) {
                        sessionManager.putCookie(result.session, result.session_ttl);
                        $state.go('home');
                    }
                    else {

                    }
                })
        }
    }
    else {
        $state.go('home');
    }
});
