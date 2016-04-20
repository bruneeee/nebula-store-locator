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
});
