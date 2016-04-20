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

storeLocator.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

      $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'view/homeView.html',
        controller: 'homeController'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'view/loginView.html',
        controller: 'loginController'
      })
      .state('stores', {
          url: '/stores',
          templateUrl: 'view/storesView.html',
          controller: 'storesController'
      })
      .state('details', {
          url: '/details/:id',
          templateUrl: 'view/detailsView.html',
          controller: 'detailsController'
      })
      .state('map', {
          url: '/map',
          templateUrl: 'view/mapView.html',
          controller: 'mapController'
      })
});

storeLocator.run(function($rootScope, $state, sessionManager) {
    $rootScope.$on('$stateChangeSuccess', function () {
        if(sessionManager.getCookie()) {
            sessionManager.verify(function(result) {
                if(!result) {
                    $state.go('login')
                }
            });
        }
        else {
            $state.go('login');
        }
    })
});
