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



    function NewPageController($routeParams, PageService,WebsiteService,$location) {
        var vm = this;
        vm.createPage=createPage;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);



            vm.pages=PageService.findPageByWebsiteId(vm.websiteId);




        }
        init();

        function createPage(page){
            page._id=(new Date()).getTime();
            page.websiteId=vm.websiteId;

            console.log(page);
            PageService.createPage(page.websiteId,page);
            vm.pages = PageService.findPageByWebsiteId(page.websiteId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");

        }


    }

    function EditPageController($routeParams, PageService,WebsiteService,$location) {
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

        function deletePage(page) {
            console.log(page);
            PageService.deletePage(vm.pageId);
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }
    }




})();
