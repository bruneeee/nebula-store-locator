angular.module('routerApp')
    .controller('loginController', function(LoginFactory, $scope, $state){

        //$scope.email = "tsac-2015@tecnicosuperiorekennedy.it";
        //$scope.password = "tsac";

        $scope.email = "";
        $scope.password = "";

        $scope.login = function(){
            alert("Login con " + $scope.email + " " + $scope.password);
            LoginFactory.login($scope.email, $scope.password,
                function(err, result) {
                    if (err) {
                        error();
                        return console.log("Errore cosa? ", err);
                    }
                    console.log("Uo", result);
                    console.log(result.session);
                    $state.go('home', {session: result.session});
                });
        };

        function error(){
            //TODO scrivere modali ultratamarri o non so cosa
            alert("Email o password errati");
        }
        //$scope.login();
    });