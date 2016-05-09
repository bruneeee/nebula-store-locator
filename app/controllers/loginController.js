storeLocator.controller("loginController", function($scope, $state, $stateParams, sessionManager) {

    $scope.forcedLogoutId = $stateParams.id;

    switch($scope.forcedLogoutId) {
        case "session_expired":
            $scope.forcedLogoutMessage = "Sessione scaduta.";
            break;
        default:
            $scope.forcedLogoutMessage = "Problema del server, riprova più tardi.";
    }


    if(!sessionManager.getCookie()) {
        $scope.submit = function() {
            sessionManager.login({
                    email:      $scope.email,
                    password:   $scope.password
                },
                function(result) {
                    if(!result){
                        $state.go('login', {id: 'external_error'});
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
