/**
 * Created by Soumya on 10/16/16.
 */


(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",WebsiteService);

    function WebsiteService() {
        var websites= [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }

        ];

        var api={

            createWebsite:createWebsite,
            findWebsitesByUser:findWebsitesByUser,
            findWebsiteById:findWebsiteById,
            updateWebsite:updateWebsite,
            deleteWebsite:deleteWebsite


        };
        return api;

        function createWebsite(userId, website)  {
            websites.push(website);

        }


        function findWebsiteById(websiteId) {
            for (var w in websites) {
                if (websites[w]._id === websiteId) {
                    return websites[w];
                }
            }

        }

        function findWebsitesByUser(userId) {
            var result = [];
            for(var w in websites) {
                if(websites[w].developerId === userId) {
                    result.push(websites[w]);
                }
            }
            return result;
        }

        function deleteWebsite(websiteId)  {

            for(var u in websites) {
                var website = websites[u];
                if(website._id === websiteId) {
                    delete websites[u];

                }
            }


        }

        function updateWebsite(websiteId, website)   {
            for(var u in websites) {
                var us = websites[u];
                if(us._id === websiteId) {
                    us = website;

                }
            }

        }
    }
})();