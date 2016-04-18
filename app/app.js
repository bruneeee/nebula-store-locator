var storeLocator = angular.module('storeLocator', [
  "ngCookies",
  "ui.router"
])

storeLocator.constant("RequestURL", {
  auth: {
    protocol:   "http",
    host:       "its-bitrace.herokuapp.com"
  },
  datasource:{
    protocol:   "http",
    host:       "its-bitrace.herokuapp.com"
  }
})

storeLocator.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: 'pages/homeView.html',
    controller: 'homeController'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'pages/loginView.html',
    controller: 'loginController'
  })
})
