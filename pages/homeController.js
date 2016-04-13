angular.module('routerApp')
    .controller('homeController', function($scope){
         
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



                    });
                  
    });