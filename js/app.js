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
  .state('contact', {
    url: '/contact',
    templateUrl: 'pages/contactView.html',
    controller: 'contactController'
  })
  .state('details', {
    url: '/details/:id',
    templateUrl: 'pages/detailsView.html',
    controller: 'detailsController'
  })
  .state('edit', {
    url: '/edit/:id',
    templateUrl: 'pages/editView.html',
    controller: 'editController'
  })
})
