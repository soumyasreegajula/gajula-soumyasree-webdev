/**
 * Created by Soumya on 10/16/16.
 */

(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService);

    function PageService() {
        var pages= [
            { "_id": "321", "name": "Post 1", "websiteId": "456" },
            { "_id": "432", "name": "Post 2", "websiteId": "456" },
            { "_id": "543", "name": "Post 3", "websiteId": "456" },
            { "_id": "670", "name": "Post 3", "websiteId": "567" }

        ];

        var api={

            createPage:createPage,
            findPageByWebsiteId:findPageByWebsiteId,
            findPageById:findPageById,
            updatePage:updatePage,
            deletePage:deletePage


        };
        return api;

        function createPage(websiteId, page)  {
            for(var p in pages) {
                if(pages[p].websiteId === websiteId) {


                    pages.push(page);

                }
            }

        }


        function findPageByWebsiteId(websiteId)  {
            var result=[];
            for (var p in pages) {
                if (pages[p].websiteId === websiteId) {
                    result.push(pages[p]);
                }
            }
            console.log(result);
            return result;
        }

        function findPageById(pageId)  {
            var result=[];
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    return pages[p];
                }
            }
            return null;

        }

        function deletePage(pageId)   {

            console.log(pageId);
            for(var p in pages) {
                var page = pages[p];
                console.log(page);
                if(page._id == pageId) {
                    delete pages[p];
                }
            }
        }


        function updatePage(pageId, page) {

            for(var u in pages) {
                var us = pages[u];
                if(us._id === pageId) {

                    pages[u] = page;
                }
            }
        }
    }
})();