storeLocator.controller("homeController", function($scope, $state, sessionManager) {

    console.log(sessionManager.getCookie());
    sessionManager.verify( function(data) {
        console.log(data);
    })
});
