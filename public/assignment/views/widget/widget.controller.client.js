/**
 * Created by Soumya on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);








        function WidgetListController($routeParams,
                                      WidgetService, $sce) {
            var vm  = this;
            vm.userId = $routeParams['uid'];
            vm.websiteId  = $routeParams['wid'];
            vm.pageId  = $routeParams['pid'];
            vm.widgetId = $routeParams['wgid'];
            vm.checkSafeHtml = checkSafeHtml;
            vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;

            function init() {
                vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
            }
            init();

            function checkSafeHtml(html) {
                return $sce.trustAsHtml(html);
            }

            function checkSafeYouTubeUrl(url) {
                var parts = url.split('/');
                var id = parts[parts.length - 1];
                url = "https://www.youtube.com/embed/"+id;
                console.log(url);
                return $sce.trustAsResourceUrl(url);
            }
        }






    function NewWidgetController($routeParams, WidgetService,$location,$sce) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId  = $routeParams['wid'];
        vm.pageId  = $routeParams['pid'];
        vm.createWidget=createWidget;
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;



        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);

        }
        init();

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYouTubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/"+id;
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }

        function createWidget(widget){
            console.log(widget);
            widget._id=(new Date()).getTime();
            widget.pageId=vm.pageId;


            WidgetService.createWidget(vm.pageId,widget);
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");

        }

    }


    function EditWidgetController($routeParams,
                                      WidgetService,$sce,$location) {
        var vm  = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId  = $routeParams['wid'];
        vm.pageId  = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;
        vm.updateWidget=updateWidget;
        vm.deleteWidget=deleteWidget;

        function init() {
            vm.widgets = WidgetService.findWidgetById(vm.widgetId);

        }
        init();

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYouTubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/"+id;
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }

        function updateWidget(widgetId, widget) {
            WidgetService.updatePage(vm.widgetId, widget);
            vm.widgets = WidgetService.findWidgetById(vm.widgetId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }

        function deleteWidget(widget) {
            console.log(widget);
            WidgetService.deleteWidget(vm.widgetId);
            vm.widgets = WidgetService.findWidgetById(vm.widgetId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");

        }
    }




})();