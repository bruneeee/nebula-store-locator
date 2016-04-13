var routerApp = angular.module('routerApp', ['ui.router']);


routerApp.config(function($stateProvider, $urlRouterProvider) {
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
    ;
});












function data(){
    var temp = [
        {id: 1, name: 'prodotto 1'},
        {id: 2, name: 'prodotto 2'}];

    var result = new Object();

    result.getAll = function(){
        return temp;
    };

    result.getById = function(id){
        for(var i= 0; i < temp.length; i++){
            var x = temp[i];
            if(x.id == id)
            return x;
        }

        return null;
    };
    return result;
};


var products = data().getAll();

var product = data().getById(1);









