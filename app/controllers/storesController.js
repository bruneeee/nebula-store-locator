/**
 * Created by Nicolo on 18/04/2016.
 */
storeLocator.controller("storesController", function($scope, storesManager) {
    //console.log("Porcodio");
    storesManager.getAll(function(data){
        console.log(data);
    });
    //sM = new storesManager();
    //console.log(sM.gg());
});
