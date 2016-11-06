/**
 * Created by Soumya on 10/16/16.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);


    function PageListController($location, $routeParams, PageService,WebsiteService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId=$routeParams['pid'];

        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .then(function (response) {
                    vm.pages = response.data;
                });
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function (response) {
                    vm.websites = response.data;
                    console.log(vm.websites);
                });
        }
        init();

    }



    function NewPageController($routeParams, PageService,WebsiteService,$location) {
        var vm = this;
        vm.createPage=createPage;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .then(function (response) {
                    vm.pages = response.data;
                });
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function (response) {
                    vm.websites = response.data;
                    console.log(vm.websites);
                });
        }
        init();

        function createPage(page){
            page._id=(new Date()).getTime();
            page.websiteId=vm.websiteId;

            console.log(page);
            PageService
                .createPage(vm.websiteId,page)
                .then(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                });

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
            PageService
                .findPageById(vm.pageId)
                .then(function (response) {
                    vm.page = response.data;
                })
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .then(function (response) {
                    vm.pages = response.data;
                })
        }
        init();

        function updatePage() {
            PageService
                .updatePage(vm.pageId,vm.page)
                .then(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                });
        }



        function deletePage() {
            PageService
                .deletePage(vm.pageId)
                .then(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                });
        }
    }
})();
