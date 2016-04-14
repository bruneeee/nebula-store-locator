angular.module('routerApp')
    .controller('homeController', function($scope, StoresFactory, $stateParams){
         
        $(document).ready(

                    function () {

                        $('#homeSection').animate({
                            top: "0px"
                        }, {
                            step: function (now, fx) {
                                $('#logoHome').css("-webkit-transition", "all 2s ease-in-out");
                                $('#logoHome').css("opacity", "1");
                            },
                            duration: 2000
                        }, 'linear');
                        setInterval(function () {
                            $('#logoHome').css("-webkit-transition", "all 2s ease-in-out");
                            $('#logoHome').css('width', '100px');
                        }, 1000);

                        setInterval(function () {
                            $('#homeSection').css("-webkit-transition", "all 2s ease-in-out");
                            $('#homeSection').css("background", "white")
                        }, 1600);

                        setInterval(function () {
                            $('.navBarSpan').fadeIn(500);
                        }, 2000);

                    });
        $(document).ready(

        $(".navBarSpan").hover(

      function () {
          $(this).addClass("hvr-underline-from-center");
      },
      function () {
          $(this).addClass("hvr-underline-from-center");
      })
                    );

                  

        $scope.getStores = function(){
            StoresFactory.getAll($stateParams.session, function(err, result){
                if (err) return console.log("Errore cosa? ", err);
                console.log("Uo", result);
                return result;
            })
        };

        $scope.getStore = function(guid){
            StoresFactory.get($stateParams.session, guid, function(err, result){
                if (err) return console.log("Errore cosa? ", err);
                console.log("Uo", result);
                return result;
            })
        };

        //$scope.getStores();

    });