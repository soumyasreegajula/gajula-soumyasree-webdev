/**
 * Created by Soumya on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);




    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];


        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);


        }
        init();
    }

    function NewWebsiteController($routeParams, WebsiteService,$location) {
        var vm = this;
        vm.createWebsite=createWebsite;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];


        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);

        }
        init();

        function createWebsite(website){
            website._id=(new Date()).getTime();
            website.developerId=vm.userId;

            console.log(website);
            WebsiteService.createWebsite(website.developerId,website);
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            $location.url("/user/"+vm.userId+"/website/new");
        }

    }

    function EditWebsiteController($routeParams, WebsiteService,$location) {
        var vm = this;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;



        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];



        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);



        }
        init();

        function updateWebsite(website) {
            console.log(website);
            WebsiteService.updateWebsite(vm.websiteId, website);

            $location.url("/user/"+vm.userId+"/website");
        }

        function deleteWebsite(website) {
            console.log(website);
            WebsiteService.deleteWebsite(vm.websiteId);
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            $location.url("/user/"+vm.userId+"/website/new");

        }


    }
})();



