app.service('storeService', function () {
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
});
