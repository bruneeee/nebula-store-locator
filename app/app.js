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
    userIcon: "assets/images/userpos.png",
    storeIcon: "assets/images/pin.png"
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
        url: '/login/:id',
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
                    $state.go('login', {id: 'session_expired'});
                }
            });
        }
        else {
            $state.go('login');
        }
    })
});
