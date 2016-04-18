storeLocator.factory("storesManager", function($http,sessionManager,RequestURL) {
    var session =  sessionManager.get();

    return{
        getAll : function (completionHandler) {

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
        },

        get : function(guid,completionHandler){
            $http({
                url: RequestURL.datasource.protocol+"://"+RequestURL.datasource.host + "/api/v2/stores/" + guid,
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
    }
});