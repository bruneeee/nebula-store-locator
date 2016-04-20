var routerApp = angular.module('routerApp', ['ui.router', "ngStorage"]);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('home', {
            url: '/home/:session',
            templateUrl: 'pages/homeView.html',
            controller: 'homeController'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'pages/loginView.html',
            controller: 'loginController'
        })
        .state('details', {
            url: '/details/:guid/:session',
            templateUrl: 'pages/detailsView.html',
            controller: 'detailsController'
        })
    ;
});
