storeLocator.service("storesManager", function($http,sessionManager) {
    var session = new sessionManager();

    /*var resStores = {
        "success": true,
        "data": [
            {
                "phone": "+17 (840) 462-2297",
                "guid": "94135974-5939-4a3d-92b3-ada4e4d6f2d1",
                "name": "ZILIDIUM",
                "address": "259 Bennet Court, Harleigh, Maryland, 6538",
                "latitude": "27.093567",
                "longitude": "157.657303"
            },
            {
                "phone": "+8 (814) 429-2102",
                "guid": "068c0698-a71e-48f8-b34d-c5de5bbed8af",
                "name": "RECOGNIA",
                "address": "815 Humboldt Street, Talpa, Arkansas, 2758",
                "latitude": "40.74477",
                "longitude": "111.119034"
            },
            {
                "phone": "+27 (809) 585-2967",
                "guid": "d98acbce-3d39-4c00-a9d0-cf6aaeba636f",
                "name": "SYNKGEN",
                "address": "101 Melba Court, Tedrow, New Jersey, 8049",
                "latitude": "-72.963175",
                "longitude": "161.012551"
            },
            {
                "phone": "+25 (927) 470-2010",
                "guid": "8907bc80-1788-4deb-8a89-b091d5714ba0",
                "name": "FURNIGEER",
                "address": "553 Coles Street, Sussex, Delaware, 6839",
                "latitude": "-85.315745",
                "longitude": "-10.409888"
            },
            {
                "phone": "+2 (811) 443-2550",
                "guid": "499fb7f7-980e-4b9b-bfe1-2fef05a951e4",
                "name": "KIGGLE",
                "address": "128 Lawn Court, Corriganville, North Carolina, 8096",
                "latitude": "-15.316148",
                "longitude": "-128.469227"
            }]
    };*/
    this.gg = function(){return "cane"};
    this.getAll = function (completionHandler) {

        $http({
            url: storeLocator.datasource.protocol+"://"+storeLocator.datasource.host + "/api/v2/stores",
            method: "GET",
            header: {"x-bitrace-session": session}
        }).success(function (result) {
            if (result.success == false)
                completionHandler(undefined);
            else
                completionHandler(result.data);
        }).error(function () {
            completionHandler(undefined);
        })
};

    this.get = function(guid,completionHandler){
        $http({
            url: storeLocator.datasource.protocol+"://"+storeLocator.datasource.host + "/api/v2/stores/" + guid,
            method: "GET",
            header: {"x-bitrace-session": session}
        }).success(function (result) {

            if (result.success == false)
                completionHandler(undefined);
            else
                completionHandler(result.data);
        }).error(function () {
            completionHandler(undefined);
        })
    };
});