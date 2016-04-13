var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');

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
        .state('login',{
            url: '/login/:id',
            templateUrl: 'pages/loginView.html',
            controller: 'loginController'
        })
    ;
});



