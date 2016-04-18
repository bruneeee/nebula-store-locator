storeLocator.factory("sessionManager", function($cookies) {

    return {
        put: function(data, expireDate) {
            $cookies.put('session', data, {'expires': new Date(expireDate*1000)});
        },
        get: function() {
            return $cookies.get('session');
        }
    }
});