angular.module('routerApp')
    .controller('homeController', function ($scope, StoresFactory, $stateParams, $state, SessionService) {

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

                        setInterval(function () {
                            $(".divSocial").fadeIn(600);

                        }, 3200);


                    });

       $(document).ready(

       $(".divSocial a:nth-child(1), .divSocial a:nth-child(2), .divSocial a:nth-child(3), .divSocial a:nth-child(4)").hover(

     function () {
         $("i", this).css("color", "white");
         $("i", this).css("-webkit-transition", "all 0.5s ease-in-out");
         $("i", this).css("transform","translate(0,+50px)");
     },
     function () {
         $("i", this).css("color", "initial");
         $("i", this).css("-webkit-transition", "all 0.5s ease-in-out");
         $("i", this).css("transform", "translate(0,0px)");
     })
                   );

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
         $(".preSpanStoreLink", this).stop().fadeOut(300);
     })
                   );

        var fading = false;

        $(document).ready(

         $("#mappa").click(

          function () {
              if (fading) return google.maps.event.trigger(map, 'resize');;
              fading = true;
              google.maps.event.trigger(map, 'resize');
              $(".divNegozi").stop().slideUp(500);

              setTimeout(function () {
                  $("#gmap01").slideDown(500);
              }, 1000);

              setTimeout(function () {
                  $('#mappa').trigger('click');
                  fading = false;
              }, 1800);
             

          }

          ));

       $(document).ready(

       $("#negozi").click(

         function () {
             if (fading) return google.maps.event.trigger(map, 'resize');
             fading = true;
             $("#gmap01").stop().slideUp(500);

             setTimeout(function () {
                 $(".divNegozi").slideDown(500);
             }, 1000);

             setTimeout(function () {
                 $('.divNegozi').trigger('click');
                 fading = false;
             }, 1800);
         }


         ));


       $(document).ready(

      $("#gmap01").hover(

       function () {
           google.maps.event.trigger(map, 'resize');
           
       },

       function () {
           google.maps.event.trigger(map, 'resize');

       }));




        //Gesu' cristo

        $scope.stores1 = [];
        $scope.stores2 = [];
        $scope.stores3 = [];

        $scope.getStores = function () {
            StoresFactory.getAll($stateParams.session, function (err, result) {
                if (err) return console.log("Errore cosa? ", err);
                //console.log("Uo", result);
                fillArrays(result);
                return true;
            })
        };

        $scope.getStore = function (guid) {
            StoresFactory.get($stateParams.session, guid, function (err, result) {
                if (err) return console.log("Errore cosa? ", err);
                //console.log("Uo", result);
                return result;
            })
        };

        $scope.getState = function (storeObj) {
            return storeObj.address.split(",")[2];
        }

        $scope.goToDetails = function (storeObj) {//<---- usare questo per passare ai dettagli
            console.log(storeObj);
            var id = storeObj.guid;
            $state.go('details', { guid: id, session: $stateParams.session });
        }

        $scope.logout = function(){//<---- usare questo per il logout
            //$sessionStorage.jesseSession = -1;
            SessionService.destroySession();
            $state.go('login');
        }

        //$scope.stores = $scope.getStores();

        $scope.sortMode = 2; //0 niente, 1 alfabetico (dei nomi?), 2 per stato alfabetico

        function fillArrays(data) {
            data = data.sort(function (a, b) {
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
            //console.log($scope.stores1);
            //console.log($scope.stores2);
            //console.log($scope.stores3);
            storesLoaded = true;
            addStoreMarkers();
        }

        function getLocationString(storeObj) {
            var s = storeObj.address.split(",");
            var sortedAdress = s[0].split(" ").slice((1)).toString().replace(",", " ") + " " + s[0].split(" ")[0];
            return (s[2] + s[1] + " " + sortedAdress).slice(1);
        }



        $scope.getStores();
        //console.log($scope.stores);

        var map = {};
        var centerMarker;
        var previousAnimatedMarker;
        var mapLoaded = false;
        var storesLoaded = false;
        var storeMarkers;

        var s = document.createElement("script");   //TODO sapete cosa questo sarebbe da caricare una sola volta, sclera ma sembra fungere lo stesso
        s.type = "text/javascript";
        s.src = "http://maps.google.com/maps/api/js?sensor=false&v=3&libraries=geometry&&callback=initMap";
        window.initMap = function () {
            map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 6,
                zoomControl: true,
                mapTypeControl: true,
                scaleControl: true,
                streetViewControl: true,
                rotateControl: true,
                fullscreenControl: true,
                mapTypeId: 'roadmap'
            });
            var marker = new google.maps.Marker({ map: map });
            google.maps.event.addListener(marker, 'click', (function (marker) {
                return function () {

                    map.panTo(marker.position);
                }
            })(marker));
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    marker.setPosition(pos);
                    marker.setTitle("Tu sei qui");
                    map.setCenter(pos);
                    centerMarker = marker;
                    map.panBy(-600, -400);
                    //map.panTo(pos);
                }, function () {
                    alert("mappa non caricata")
                });
            }
            console.log("Mappa caricata:");
            //console.log(map);
            mapLoaded = true;
            //map.panTo(marker.position);

            addStoreMarkers();
        };
        $("head").append(s);

        function addStoreMarkers() {
            if (!mapLoaded || !storesLoaded) return;
            //console.log("Cristo!");
            var bounds = new google.maps.LatLngBounds();
            //map.setTilt(45);
            var markers = obtainMarkersArray();
            var infoWindowsContent = obtainWindowInfoArray();
            var infoWindow = new google.maps.InfoWindow(), marker;
            storeMarkers = [];
            for (var i = 0; i < markers.length; i++) {
                var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
                bounds.extend(position);
                marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    title: markers[i][0],
                    animation: google.maps.Animation.DROP
                });
                storeMarkers.push(marker);
                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infoWindow.setContent(infoWindowsContent[i][0]);
                        infoWindow.open(map, marker);
                        map.panTo(marker.position);
                        //console.log(marker.position);
                        //$scope.goToDetails(obtainStore(markers[i][3]));
                        if (previousAnimatedMarker != undefined && previousAnimatedMarker != marker) previousAnimatedMarker.setAnimation(null);
                        marker.setAnimation(google.maps.Animation.BOUNCE);
                        previousAnimatedMarker = marker;
                    }
                })(marker, i));
                //map.fitBounds(bounds);
            }
            //map.panTo(centerMarker.position);


            /*var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
                this.setZoom(14);
                google.maps.event.removeListener(boundsListener);
            });*/
            //$scope.findNearestStore();

        }

        function obtainMarkersArray() {
            var array = [];
            $scope.stores1.concat($scope.stores2).concat($scope.stores3).forEach(function (x) {
                var m = [];
                //m.push(x.name);
                m.push(x.address);
                //console.log(x.address);
                //console.log(getLanLongByAddress(x.address));
                m.push(x.latitude);
                m.push(x.longitude);
                m.push(x.name);
                array.push(m);
            })
            return array;
        }

        function obtainStore(name){
            var stores = $scope.stores1.concat($scope.stores2).concat($scope.stores3);
            for (var i = 0; i < stores.length; i++){
                console.log(stores[i].name + " " + name);
                console.log(stores[i].name.localeCompare(name));
                if (stores[i].name.localeCompare(name) == 0) return stores[i];
            }
            return null;
        }



        function obtainWindowInfoArray() {//TODO qui la descrizione con il bottone per andare ai dettagli
            var array = [];
            $scope.stores1.concat($scope.stores2).concat($scope.stores3).forEach(function (x) {
                var m = [
                    "<h4>" + x.name + "</h4>" +
                    "<h5>" + x.address + "</h5>" +
                    '<button class="btn btn-default center-block trovaNegozio" onclick="cristo(\'' + x.name + '\')">Visualizza dettagli</button>'
                ];
                array.push(m);
            })
            console.log(array);
            return array;
        }



        function getLanLongByAddress(add) {//TODO delay tra le richieste o da OVER_QUERY_LIMIT ma che poi sta roba neanche serve
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': add }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    //console.log("Ma scusa eh " + add);
                    return results[0].geometry.location;
                }
                else {
                    //console.log("Errore cosa? " + status + " " + add);
                }
            });
        }

        $scope.findNearestStore = function(){
            var lowerMarker;
            var lowerDistance;
            var distance;
            console.log(storeMarkers);
            for (var i = 0; i < storeMarkers.length; i++){
                if (i == 0){
                    lowerMarker = storeMarkers[0];
                    lowerDistance = getDistanceBetweenMarkers(centerMarker, storeMarkers[0]);
                }
                else {
                    distance = getDistanceBetweenMarkers(centerMarker, storeMarkers[i]);
                    if (distance < lowerDistance){
                        lowerMarker = storeMarkers[i];
                        lowerDistance = distance;
                    }
                }
            }
            map.panTo(lowerMarker.position);
        }

        function getDistanceBetweenMarkers(a, b){
            return google.maps.geometry.spherical.computeDistanceBetween(a.position, b.position);
        }

        if (!SessionService.allowSession($stateParams.session)) $state.go('login');
    });

cristo = function(x){
    console.log(x);
    var scope = angular.element(document.getElementById('homeController')).scope;
    console.log(scope);
    scope.logout();
    scope.$apply();
};