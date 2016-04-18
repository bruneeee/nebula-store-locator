storeLocator.factory("loginManager", function($http, RequestURL) {
    return {
        login: function (data, completionHandler) {

            var _password = data.password;

            if (!data.encryptedPassword)
                _password = CryptoJS.SHA512(data.password).toString(CryptoJS.enc.Base64);

            $http.post("http://" + RequestURL.auth.host + "/api/public/v2/login", {
                email: data.email,
                password: _password
            }).success(function (result) {
                if (result.success == false)
                    completionHandler(undefined);
                else
                    completionHandler(result.data)
            }).error(function () {
                completionHandler(undefined)
            })
        }
    }
});
