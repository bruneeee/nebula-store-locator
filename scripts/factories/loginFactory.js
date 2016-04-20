/**
 * Created by Luca on 20/04/2016.
 */
routerApp.factory('LoginFactory', function($http){

    var loginFactory = {};

    loginFactory.login = function(email, password, callback){
        var emailLogin = email;
        var passwordLogin = password;
        passwordLogin = crypt(passwordLogin);
        $http.post("http://its-bitrace.herokuapp.com/api/public/v2/login",{
            email: emailLogin,
            password: passwordLogin
        }).success(function(result) {
            if (result.success) callback(null,(result.data || []));
            else callback(true);
        }).error(function(result) {
            callback(true);
        })

    };

    function crypt(pass){
        return CryptoJS.SHA512(pass).toString(CryptoJS.enc.Base64);
    }

    return loginFactory;

});