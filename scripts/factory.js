/**
 * Created by Luca on 13/04/2016.
 */
routerApp.factory('LoginFactory', function($http){

    var loginFactory = {};

    loginFactory.login = function(email, password, callback){
        var emailLogin = email;
        var passwordLogin = password;
        passwordLogin = CryptoJS.SHA512(password).toString(CryptoJS.enc.Base64)
    }

    return loginFactory;

})