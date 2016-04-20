storeLocator.factory('localizationManager', [ function () {

    return {
        getPosition: function(completionHandler){
            if (navigator.geolocation)
                navigator.geolocation.getCurrentPosition(completionHandler);
            else
                completionHandler(null);
        }
    };
}]);