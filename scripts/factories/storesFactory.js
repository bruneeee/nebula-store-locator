/**
 * Created by Luca on 20/04/2016.
 */
routerApp.factory('StoresFactory', function($http){

    var storesFactory = {};

    storesFactory.getAll = function(session, callback){
        var sessionGet = session;
        $http.get('http://its-bitrace.herokuapp.com/api/v2/stores',{
            headers: {
                'x-bitrace-session': sessionGet
            }
        }).success(function(result) {
            if (result.success) callback(null,(result.data || []));
            else callback(true);
        }).error(function(result) {
            callback(true)
        })

    };

    storesFactory.get = function(session, guid, callback){
        var sessionGet = session;
        var guidGet = guid;
        $http.get('http://its-bitrace.herokuapp.com/api/v2/stores/' + (guidGet || ""),{
            headers: {
                'x-bitrace-session': sessionGet
            }
        }).success(function(result) {
            if (result.success) callback(null,(result.data || []));
            else callback(true);
        }).error(function(result) {
            callback(true)
        })
    };

    return storesFactory;

});