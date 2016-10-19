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


        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);


        }
        init();
    }

    function NewWebsiteController($routeParams, WebsiteService) {
        var vm = this;

        vm.userId = $routeParams['uid'];


        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);

        }
        init();

    }

    function EditWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        vm.websiteId = $routeParams['wid'];


        vm.userId = $routeParams['uid'];


        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);


        }
        init();

        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.websiteId, website);
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
        }

    }
})();



