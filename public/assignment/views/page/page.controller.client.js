/**
 * Created by Soumya on 10/16/16.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);


    function PageListController($routeParams, PageService,WebsiteService) {



        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];


        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);

            vm.pages=PageService.findPageByWebsiteId(vm.websiteId);


        }
        init();

    }



    function NewPageController($routeParams, PageService,WebsiteService) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);



            vm.pages=PageService.findPageByWebsiteId(vm.websiteId);




        }
        init();

    }

    function EditPageController($routeParams, PageService,WebsiteService) {
        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId=$routeParams['pid'];
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);



            vm.pages=PageService.findPageByWebsiteId(vm.websiteId);




        }
        init();

        function updatePage(pageId, page) {
            PageService.updatePage(vm.pageId, page);
        }

        function deletePage() {
            PageService.deletePage(vm.pageId);
        }
    }




})();
