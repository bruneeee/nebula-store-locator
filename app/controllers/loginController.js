storeLocator.controller("loginController", function($scope, $state, sessionManager) {

    if(!sessionManager.getCookie()) {
        $scope.submit = function() {
            sessionManager.login({
                    email:      $scope.email,
                    password:   $scope.password
                },
                function(result) {
                    if(!result.errorCode) {
                        sessionManager.putCookie(result.session, result.session_ttl);
                        $state.go('home');
                    }
                    else{
                        console.log(result.errorCode);
                    }
                })
        }
    }
    else {
        $state.go('home');
    }
});
