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
            { "_id": "543", "name": "Post 3", "websiteId": "567" }

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
            return result;


        }
        function findPageById(pageId)  {
            var result=[];
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    result.push(pages[p]);
                }
            }
            return result;

        }

        function deletePage(pageId)   {

            for(var p in pages) {
                var page = pages[p];
                if(page.pageId === pageId) {
                    delete pages[p];
                }
            }


        }


        function updatePage(pageId, page) {

            for(var u in pages) {
                var us = pages[u];
                if(us._id === pageId) {
                    us = page;
                }
            }


        }
    }
})();