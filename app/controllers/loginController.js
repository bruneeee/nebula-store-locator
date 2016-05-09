storeLocator.controller("loginController", function($scope, $state, $stateParams, sessionManager) {

    $scope.expiredSession = $stateParams.id;

    if(!sessionManager.getCookie()) {
        $scope.submit = function() {
            sessionManager.login({
                    email:      $scope.email,
                    password:   $scope.password
                },
                function(result) {
                    if(!result){
                        $state.go('login', {id: 'session_expired'});
                    }
                    else if(!result.errorCode) {
                        sessionManager.putCookie(result.session, result.session_ttl);
                        $state.go('home');
                    }
                    else{
                        $scope.accessDenied = true;
                        if(result.errorCode == 200 || result.errorCode == 401) {
                            $scope.errorMsg = "Autenticazione fallita, controlla le credenziali"
                        }

                    }
                })
        }
    }
    else {
        $state.go('home');
    }
});
