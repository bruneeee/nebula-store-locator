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
                            $('#logoHome').css('width', '180px');
                        }, 1000);

                        setTimeout(function () {
                            $('#homeSection').css("-webkit-transition", "all 2s ease-in-out");
                            $('#homeSection').css("background-image", "url('images/gold.svg')");
                        }, 2800);

                        setTimeout(function () {
                            $('.navBarSpan').fadeIn(500);
                        }, 2800);

                        setTimeout(function () {
                            $(".divNegozi").fadeIn(600);

                        }, 3000);

                        setTimeout(function () {
                            $("#gmap01").fadeIn(600);
                            google.maps.event.trigger(map, 'resize');
                        }, 3000);
   
                    });

        //TODO modale per sessione scaduta e per geocalizzazione fallita

        var stores = [];
        $scope.stores1 = [];
        $scope.stores2 = [];
        $scope.currentStore = {}; // store per il dettaglio incorporato nella home

        var map = {};
        var centerMarker;
        var storeMarkers;
        var previousAnimatedMarker;

        var mapLoaded = false;
        var storesLoaded = false;

        $scope.getStores = function () {
            StoresFactory.getAll($stateParams.session, function (err, result) {
                if (err) return console.log("Errore cosa? ", err);
                //console.log("Uo", result);
                stores = result;
                fillArrays(result.slice(0));
                return true;
            })
        };

        $scope.getState = function (storeObj) {
            return storeObj.address.split(",")[2];
        };

        $scope.goToDetails = function (storeObj) {// dettaglio in pagina a se stante
            console.log(storeObj);
            var id = storeObj.guid;
            $state.go('details', { guid: id, session: $stateParams.session });
        };

        //Detail Controller embbed o come cazzo si scrive, GG Raggio

        $scope.getThisStore = function (storeObj) {
            if (storeObj.name.localeCompare($scope.currentStore.name) != 0){
                $(document).ready(
                    function () {// tamarrate
                        $(".divDetail").addClass("animated zoomOut");
                    });
            }
            else return;
            var id = storeObj.guid;
            StoresFactory.get($stateParams.session, id, function (err, result) {
                if (err) return console.log("Errore cosa? ", err);
                $scope.currentStore = result;
                $(document).ready(
                   function () {// tamarrate
                       setTimeout(function () {
                           $(".divDetail").removeClass("animated zoomOut");
                           $(".divDetail").fadeIn().addClass("animated zoomIn");
                       }, 10);
                   });
            })
        };

        //Fine detail controller

        $scope.logout = function () {//<---- usare questo per il logout
            SessionService.destroySession();
            $state.go('login');
        };

        $scope.findNearestStore = function () {
            var lowerMarker;
            var lowerDistance;
            var distance;
            console.log(storeMarkers);
            for (var i = 0; i < storeMarkers.length; i++) {
                if (i == 0) {
                    lowerMarker = storeMarkers[0];
                    lowerDistance = getDistanceBetweenMarkersPositions(centerMarker.position, storeMarkers[0].position);
                }
                else {
                    distance = getDistanceBetweenMarkersPositions(centerMarker.position, storeMarkers[i].position);
                    if (distance < lowerDistance) {
                        lowerMarker = storeMarkers[i];
                        lowerDistance = distance;
                    }
                }
            }
            //map.panTo(lowerMarker.position);
            $scope.clickStore(getStoreFromMarker(lowerMarker.title));
        }

        //$scope.stores = $scope.getStores();

        $scope.sortMode = 2; //0 niente, 1 alfabetico (dei nomi?), 2 per stato alfabetico, 3 per distanza dall' utente

        $scope.clickStore = function(x){
            //$scope.getThisStore(x);
            var m = getMarkerFromStore(x.name);
            map.panTo(m.position);
            google.maps.event.trigger(m, 'click');
        }

        $scope.sort = function(){
            sortByDistance(stores.slice(0));
        }

        function fillArrays(data) {
            data = data.sort(function (a, b) {
                if ($scope.sortMode == 1) return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
                if ($scope.sortMode == 2) {
                    var ad1 = getLocationString(a);
                    var ad2 = getLocationString(b);
                    return ad1 > ad2 ? 1 : ad1 < ad2 ? -1 : 0;
                }
            });
            $scope.stores1 = data.slice(0, data.length / 2);
            $scope.stores2 = data.slice(data.length / 2, data.length);
            /*$scope.stores3 = data.slice(20, 30);*/
            //console.log($scope.stores1);
            //console.log($scope.stores2);
            //console.log($scope.stores3);
            storesLoaded = true;
            addStoreMarkers();
            console.log(stores);
        }

        function getLocationString(storeObj) {
            var s = storeObj.address.split(",");
            var sortedAdress = s[0].split(" ").slice((1)).toString().replace(",", " ") + " " + s[0].split(" ")[0];
            return (s[2] + s[1] + " " + sortedAdress).slice(1);
        }

        var s = document.createElement("script");   //TODO sapete cosa questo sarebbe da caricare una sola volta, sclera ma sembra fungere lo stesso
        s.type = "text/javascript";
        s.src = "http://maps.google.com/maps/api/js?sensor=false&v=3&libraries=geometry&&callback=initMap";
        window.initMap = function () {
            map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 3,
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
                    marker.setTitle("Tu sei qui!");
                    map.setCenter(pos);
                    centerMarker = marker;
                    map.panBy(-300, -200);
                    //map.panTo(pos);
                }, function () {
                    alert("Non e' stato possibile individuare la tua posizione.")
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
                    title: markers[i][3],
                    animation: google.maps.Animation.DROP
                });
                storeMarkers.push(marker);
                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infoWindow.setContent(infoWindowsContent[i][0]);
                        infoWindow.open(map, marker);
                        map.panTo(marker.position);
                        $scope.getThisStore(getStoreFromMarker(marker.title));
                        //zoomAnimation(marker);
                        //console.log(marker.position);
                        //$scope.goToDetails(obtainStore(markers[i][3]));
                        console.log(marker.title);
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
            stores.forEach(function (x) {
                var m = [];
                //m.push(x.name);
                m.push(x.address);
                //console.log(x.address);
                //console.log(getLanLongByAddress(x.address));
                m.push(x.latitude);
                m.push(x.longitude);
                m.push(x.name);
                array.push(m);
            });
            return array;
        }



        function getStoreFromMarker(name){
            for (var i = 0; i < stores.length; i++) {
                console.log(stores[i].name + " " + name);
                console.log(stores[i].name.localeCompare(name));
                if (stores[i].name.localeCompare(name) == 0) return stores[i];
            }
            return null;
        }

        function getMarkerFromStore(name){
            console.log("Confronto!");
            for (var i = 0; i < storeMarkers.length; i++){
                console.log(storeMarkers[i].title + " " + name);
                if (storeMarkers[i].title.localeCompare(name) == 0) return storeMarkers[i];
            }
            return null;
        }


        function obtainWindowInfoArray() {
            var array = [];
            stores.forEach(function (x) {
                var content = document.createElement('div');
                content.innerHTML = "<h4 style='color:black'>" + x.name + "</h4>" +
                                    "<h5 style='color:rgb(48,48,48)'>" + x.address + "</h5>" +
                //"<img src='"+x.featured_image+"' />";
                "<button class='buttonStoreImage' onclick='cristo()'>Store Image</button>";
                /*button = content.appendChild(document.createElement('input'));
                button.type = 'button';
                button.class = 'buttonNearNavSpan';
                button.value = 'Store Image';*/
                google.maps.event.addDomListener(content, 'click', function () {
                    //$scope.goToDetails(x);
                 $(document).ready(
                 function () { // img show
                     $("#map").fadeOut(200);
                     $("#imgStore").attr("src", "url('" + x.featured_image + "')");
                     $("#imgStore").fadeIn(800);
                 });
                })
                var m = [
                    /*"<h4>" + x.name + "</h4>" +
                     "<h5>" + x.address + "</h5>" +
                     '<button class="btn btn-default center-block trovaNegozio" onclick="cristo(\'' + x.name + '\')">Visualizza dettagli</button>'*/
                    content
                ];
                array.push(m);
            })
            return array;
        }

        function geocodingLanLongByAddress(add) {//TODO delay tra le richieste o da OVER_QUERY_LIMIT ma che poi sta roba neanche serve
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

        function sortByDistance(data){
            console.log(data);
            data = data.sort(function (a, b) {
                console.log((getMarkerFromStore(a.name)));
                console.log(centerMarker);
                var distance1 = getDistanceBetweenMarkersPositions(
                    new google.maps.LatLng(parseFloat(a.latitude), parseFloat(a.longitude)),
                    centerMarker.position);
                var distance2 = getDistanceBetweenMarkersPositions(
                    new google.maps.LatLng(parseFloat(b.latitude), parseFloat(b.longitude)),
                    centerMarker.position);
                return distance1 > distance2 ? 1 : distance1 < distance2 ? -1 : 0;
            });
            $scope.stores1 = data.slice(0, data.length / 2);
            $scope.stores2 = data.slice(data.length / 2, data.length);
        }

        function getDistanceBetweenMarkersPositions(a, b) {
            return google.maps.geometry.spherical.computeDistanceBetween(a, b);
        }

        function init(){
            if (!SessionService.allowSession($stateParams.session)) {
                $state.go('login');
                return;
            }
            $scope.getStores();
        }

        init();

    });