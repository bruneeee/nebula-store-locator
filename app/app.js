var storeLocator = angular.module('storeLocator', [
  "ngCookies",
  "ui.router"
]);

storeLocator.constant("RequestURL", {
  auth: {
    protocol:   "http",
    host:       "its-bitrace.herokuapp.com"
  },
  datasource:{
    protocol:   "http",
    host:       "its-bitrace.herokuapp.com"
  }
});

storeLocator.constant("Icons",{
    userIcon: "https://webdesign.danols.com/static/template/images/icons/light/pin_map_icon&48.png",
    storeIcon: "http://findicons.com/files/icons/2232/wireframe_mono/48/pin_map.png"
});

storeLocator.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

      $stateProvider
      .state('home', {
        url: '/home',
        views:{
            'stores':{
                templateUrl: 'view/storesView.html',
                controller: 'storesController'
            },
            'map':{
                templateUrl: 'view/mapView.html',
                controller: 'mapController'
            }
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'view/loginView.html',
        controller: 'loginController'
      })
      .state('details', {
          url: '/details/:id',
          templateUrl: 'view/detailsView.html',
          controller: 'detailsController'
      })
});

storeLocator.run(function($rootScope, $state, sessionManager) {

    $rootScope.$on('$stateChangeSuccess', function () {
        if(sessionManager.getCookie()) {
            sessionManager.verify(function(result) {
                if(!result) {
                    $state.go('login');
                }
            });
        }
        else {
            $state.go('login');
        }
    })
});
