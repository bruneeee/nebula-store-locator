storeLocator.service('storesService', function ($http, sessionManager, RequestURL) {

    var session =  sessionManager.getCookie();

    this.getAll = function (completionHandler) {
        if(session) {
            $http({
                url: RequestURL.datasource.protocol+"://"+RequestURL.datasource.host + "/api/v2/stores",
                method: "GET",
                headers: {"x-bitrace-session": session}
            }).success(function (result) {
                if (result.success == false)
                    completionHandler(undefined);
                else
                    completionHandler(result.data);
            }).error(function () {
                completionHandler(undefined);
            })
        }
    };

    this.get = function (guid, completionHandler) {
        if(session) {
            $http({
                url: RequestURL.datasource.protocol + "://" + RequestURL.datasource.host + "/api/v2/stores/" + guid,
                method: "GET",
                headers: {"x-bitrace-session": session}
            })
                .success(function (result) {
                    if (result.success == false) {
                        completionHandler(undefined);
                    }
                    else {
                        completionHandler(result.data);
                    }
                })
                .error(function () {
                    completionHandler(undefined);
                })
        }
    };

    this.distance = function getDistance(lat1,lon1,lat2,lon2, completionHandler) {
        var R = 6371; // Radius of the earth in km
        var dLat = (lat2-lat1) * (Math.PI/180);
        var dLon = (lon2-lon1) * (Math.PI/180);
        var a =
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) *
                Math.sin(dLon/2) * Math.sin(dLon/2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c; // Distance in km
        return completionHandler(d);
    };
});
