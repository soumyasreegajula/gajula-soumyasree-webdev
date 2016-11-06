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
                WidgetService
                    .findWidgetsByPageId(vm.pageId)
                    .then(function (response) {
                        vm.widgets = response.data;
                    });
            }
            init();

            function checkSafeHtml(html) {
                return $sce.trustAsHtml(html);
            }

            function checkSafeYouTubeUrl(url) {
                var parts = url.split('/');
                var id = parts[parts.length - 1];
                url = "https://www.youtube.com/embed/"+id;

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
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(function (response) {
                    vm.widgets = response.data;
                    console.log(vm.widgets);
                });
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function (response) {
                    vm.widget = response.data;
                });
        }

        init();



        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYouTubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/"+id;
            //console.log(url);
            return $sce.trustAsResourceUrl(url);
        }

        function createWidget(widgetType) {
            var widget = {};
            console.log(widgetType);
            var newId = (new Date()).getTime();
            console.log(newId);
            switch(widgetType){
                case 'HEADER':
                    widget= {
                        "_id": newId,
                        "widgetType": "HEADER",
                        "pageId": vm.pageId,
                        "size": vm.widget.size,
                        "text": vm.widget.text
                    };
                    break;
                case 'IMAGE':
                    widget= {
                        "_id": newId,
                        "widgetType": "IMAGE",
                        "pageId": vm.pageId,
                        "width": "100%"
                    };
                    break;
                case 'YOUTUBE':
                    widget= {
                        "_id": newId,
                        "widgetType": "YOUTUBE",
                        "pageId": vm.pageId,
                        "width": "100%"
                    };
                    break;
                case 'HTML':
                    widget= {
                        "_id": newId,
                        "widgetType": "HTML",
                        "pageId": vm.pageId,
                        "width": "100%",
                        "text":vm.widget.text
                    };
                    break;
            }

            WidgetService
                .createWidget(vm.pageId,widget)
                .then(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newId);
                });
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

                WidgetService
                    .findWidgetById(vm.widgetId)
                    .then(function (response) {
                        vm.widget = response.data;
                        console.log(vm.widget);
                    });

                WidgetService
                    .findWidgetsByPageId(vm.pageId)
                    .then(function (response) {
                        vm.widgets = response.data;
                        console.log(vm.widgets);
                    });
            }
            init();


        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYouTubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/"+id;
            //console.log(url);
            return $sce.trustAsResourceUrl(url);
        }




        function updateWidget(widget) {
            console.log("inside update");
            console.log(widget);



            WidgetService
                .updateWidget(vm.widgetId,widget)
                .then(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                });
        }

        function deleteWidget(widget) {
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                });

        }

        function createWidget(widget) {


            WidgetService
                .createWidget(widget)
                .then(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                });

        }




        }







})();