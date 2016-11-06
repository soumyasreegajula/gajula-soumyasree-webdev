/**
 * Created by Soumya on 10/16/16.
 */

(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService);

    function WidgetService($http) {


        var api={

            createWidget:createWidget,
            findWidgetsByPageId:findWidgetsByPageId,
            findWidgetById:findWidgetById,
            updateWidget:updateWidget,
            deleteWidget:deleteWidget,
            sort:sort
        };
        return api;

        function sort(pageId,initial,final){
            var url="/api/page/"+pageId+"/widget?initial=index1&final=index2";
            url=url
                .replace("index1",initial)
                .replace("index2",final);
            $http.put(url);


        }

        function createWidget(pageId, widget) {
            console.log("create url");
            var url= "/api/page/"+pageId+"/widget";
            return $http.post(url, widget);
        }

        function findWidgetById(widgetId) {
            var url= "/api/widget/"+widgetId;
            return $http.get(url);
        }

        function updateWidget(widgetId, widget) {
            var url= "/api/widget/"+widgetId;
            return $http.put(url, widget);
        }

        function deleteWidget(widgetId) {
            var url= "/api/widget/"+widgetId;
            return $http.delete(url);
        }

        function findWidgetsByPageId(pageId) {
            var url = "/api/page/"+pageId+"/widget";
            return $http.get(url);
        }
    }
})();