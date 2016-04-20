storeLocator.controller("homeController", function($scope, $state, sessionManager) {
    if(!sessionManager.getCookie()) {
        $state.go('login')
    }

    console.log(sessionManager.getCookie());
    sessionManager.verify( function(data) {
        console.log(data);
    })
});
