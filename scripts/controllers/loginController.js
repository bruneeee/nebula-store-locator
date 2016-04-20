angular.module('routerApp')
    .controller('loginController', function(LoginFactory, $scope, $state, $sessionStorage){

        //$scope.email = "tsac-2015@tecnicosuperiorekennedy.it";
        //$scope.password = "tsac";

        $scope.email = "";
        $scope.password = "";

        $(document).ready(

                  function () {

                      $("#submitButtonLogin").click(function () {
                          $("#loader").fadeIn(500);

                      })
                  });


        $scope.login = function () {

            $(document).ready(

                 function () {

                     $("#submitButtonLogin").click(function () {
                         $("#loader").fadeIn(500);
                         $("#alertHumanError").hide(10);
                     })
                 });
            
            LoginFactory.login($scope.email, $scope.password,
                function(err, result) {
                    if (err) {
                        error();
                        return console.log("Errore cosa? ", err);
                    }
                    console.log("Uo", result);
                    console.log(result.session);
                    $sessionStorage.jesseSession = result.session;
                    
                    $state.go('home', {session: result.session});
                });
        };

        function error(){
            //TODO scrivere modali ultratamarri o non so cosa
            setTimeout(function () {
                $("#alertHumanError").fadeIn(500)
            }, 500);

            $("#loader").fadeOut(500);
        }
        //$scope.login();
    });