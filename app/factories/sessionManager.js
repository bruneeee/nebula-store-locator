storeLocator.factory("sessionManager", function($http, $cookies, RequestURL) {

    var key = 'session';

    return {

        login: function(data, completionHandler) {

            var _password = data.password;

            if (!data.encryptedPassword)
                _password = CryptoJS.SHA512(data.password).toString(CryptoJS.enc.Base64);

            $http.post("http://" + RequestURL.auth.host + "/api/public/v2/login", {
                email: data.email,
                password: _password
            })
            .success(function (result) {
                if (result.success == true) {
                    completionHandler(result.data);
                }
                else {
                    completionHandler(result)
                }
            })
            .error(function () {
                completionHandler(undefined)
            })
        },

        logout: function() {
            this.removeCookie()
        },

        verify: function(completionHandler) {

            var sessionCookie = this.getCookie();

            if(sessionCookie) {
                $http({
                    url: RequestURL.auth.protocol+"://"+RequestURL.auth.host + "/api/v2/session/" + sessionCookie,
                    method: "GET",
                    headers: {"x-bitrace-session": sessionCookie}
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
                        this.removeCookie();
                        completionHandler(undefined);
                    })
            }
        },

        putCookie: function(data, expireDate) {
            $cookies.put(key, data, {'expires': new Date(expireDate*1000)});
        },

        getCookie: function() {
            return $cookies.get(key);
        },

        removeCookie: function() {
            $cookies.remove(key)
        }
    }
});