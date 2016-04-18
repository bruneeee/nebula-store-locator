storeLocator.controller("loginController", function($scope, $state, $cookies, loginManager) {

    $scope.submit = function() {
        loginManager.login({
            email:      $scope.email,
            password:   $scope.password
        },
        function(result) {
            if(result) {
                var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 1);
                $cookies.put('session', result.session, {'expires': expireDate});
                $state.go('home');
            }
        })
    }
});
