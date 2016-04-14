angular.module('routerApp')
    .controller('homeController', function($scope, StoresFactory, $stateParams, $state){
        
        //Tamarrate di raggio
        
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
                        setTimeout(function () {
                            $('#logoHome').css("-webkit-transition", "all 2s ease-in-out");
                            $('#logoHome').css('width', '100px');
                        }, 1000);

                        setTimeout(function () {
                            $('#homeSection').css("-webkit-transition", "all 2s ease-in-out");
                            $('#homeSection').css("background", "white")
                        }, 1600);

                        setTimeout(function () {
                            $('.navBarSpan').fadeIn(500);
                        }, 2000);

                        setTimeout(function () {
                                $(".divNegozi").fadeIn(600);
                            }, 2800);
                        

                    });

        $(document).ready(

        $(".navBarSpan").hover(

      function () {
          $(".preLinkNavBar", this).stop().fadeIn(250);
          $(this).addClass("hvr-underline-from-center");
      },
      function () {
          $(".preLinkNavBar", this).stop().fadeOut(250);
          $(this).addClass("hvr-underline-from-center");
      })
                    );

        $(document).ready(

     $(".leftStores span, .rightStores span, .middleStores span").hover(

     function () {
         $(".preSpanStoreLink", this).stop().fadeIn(300);
     },
     function () {
         $(".preSpanStoreLink",this).stop().fadeOut(300);
     })
                   );


        $(document).ready(

        $("#mappa").hover(

         function () {
             
             $(".divNegozi").stop().fadeOut(500);
             setTimeout(function () {
                 $("#gmap01").stop().fadeIn(500);
             }, 700);
         },

         function () {
             $(".divNegozi").stop().fadeOut(500);
             setTimeout(function () {
                 $("#gmap01").stop().fadeIn(500);
             }, 700);
         }));

        $(document).ready(

       $("#negozi").hover(

        function () {

            $("#gmap01").stop().fadeOut(500);
            setTimeout(function () {
                $(".divNegozi").stop().fadeIn(500);
            }, 700);
        },

        function () {
            $("#gmap01").stop().fadeOut(500);
            setTimeout(function () {
                $(".divNegozi").stop().fadeIn(500);
            }, 700);
        }));

       

        //Gesu' cristo

        $scope.stores1 = [];
        $scope.stores2 = [];
        $scope.stores3 = [];

        $scope.getStores = function(){
            StoresFactory.getAll($stateParams.session, function(err, result){
                if (err) return console.log("Errore cosa? ", err);
                console.log("Uo", result);
                fillArrays(result);
                return true;
            })
        };

        $scope.getStore = function(guid){
            StoresFactory.get($stateParams.session, guid, function(err, result){
                if (err) return console.log("Errore cosa? ", err);
                console.log("Uo", result);
                return result;
            })
        };

        $scope.getState = function(storeObj){
            return storeObj.address.split(",")[2];
        }

        $scope.goToDetails = function(storeObj){//<---- usare questo per passare ai dettagli
            var id = storeObj.guid;
            $state.go('details', {guid : id, session: $stateParams.session});
        }

        //$scope.stores = $scope.getStores();

        $scope.sortMode = 2; //0 niente, 1 alfabetico (dei nomi?), 2 per stato alfabetico

        function fillArrays(data){
            data = data.sort(function (a, b){
                if ($scope.sortMode == 1) return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
                if ($scope.sortMode == 2) {
                    var ad1 = getLocationString(a);
                    var ad2 = getLocationString(b);
                    return ad1 > ad2 ? 1 : ad1 < ad2 ? -1 : 0;
                }
            });
            $scope.stores1 = data.slice(0, 10);
            $scope.stores2 = data.slice(10, 20);
            $scope.stores3 = data.slice(20, 30);
            console.log($scope.stores1);
            console.log($scope.stores2);
            console.log($scope.stores3);
            console.log(getLocationString(data[0]));
        }

        function getLocationString(storeObj){
            var s = storeObj.address.split(",");
            var sortedAdress = s[0].split(" ").slice((1)).toString().replace(",", " ") + " " + s[0].split(" ")[0];
            return (s[2] + s[1] + " " + sortedAdress).slice(1);
        }



        $scope.getStores();
        //console.log($scope.stores);


                var s = document.createElement("script");
                s.type = "text/javascript";
                s.src  = "http://maps.google.com/maps/api/js?v=3&sensor=false&callback=initMap";
                window.initMap = function () {
                    var map = new google.maps.Map(document.getElementById('map'), {
                        center: {lat: -34.397, lng: 150.644},
                        zoom: 5,
                        zoomControl: true,
                        mapTypeControl: true,
                        scaleControl: true,
                        streetViewControl: true,
                        rotateControl: true,
                        fullscreenControl: true
                    });
                    var marker = new google.maps.Marker({map:map});

                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function(position) {
                            var pos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            };
                            marker.setPosition(pos);
                            marker.setTitle("Tu sei qui");
                            map.setCenter(pos);
                        }, function() {
                            alert("something went wrong please contact Gesù cristo on person")
                        });
                    }
                };
                $("head").append(s);
            });
