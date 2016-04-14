/**
* Created by Mattia on 14/04/2016.
*/
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 3,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: true
    });
    var marker  = new google.maps.Marker({map:map});

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
}

