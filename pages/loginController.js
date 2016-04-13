angular.module('routerApp')
    .controller('loginController', function(LoginFactory, $scope, $state){

        $scope.email = "tsac-2015@tecnicosuperiorekennedy.it";
        $scope.password = "tsac"; //<-----TODO da prendere entrambi nella pagina con angular

        $scope.login = function(){
            LoginFactory.login($scope.email, $scope.password,
                function(err, result) {
                    if (err) return console.log("Errore cosa? ", err);
                    console.log("Uo", result);
                    console.log(result.session);
                    $state.go('home', {session: result.session});
                });
        };

        //TODO controllo correttezza email password, gestione errori

        //$scope.login();
    });