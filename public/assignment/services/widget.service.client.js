/**
 * Created by Soumya on 10/16/16.
 */

(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService);

    function WidgetService() {
        var widgets= [
                { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"},
                { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" },
                { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ];

        var api={

            createWidget:createWidget,
            findWidgetsByPageId:findWidgetsByPageId,
            findWidgetById:findWidgetById,
            updateWidget:updateWidget,
            deleteWidget:deleteWidget


        };
        return api;

        function createWidget(pageId, widget)  {

            for(var w in widgets) {
                if(widgets[w].pageId === pageId) {


                    widgets.push(widget);
                    break;

                }
            }
            console.log(widgets);

        }


        function findWidgetsByPageId(pageId)   {
            var result=[];
            for (var w in widgets) {
                if (widgets[w].pageId === pageId) {
                    result.push(widgets[w]);
                }
            }
            return result;


        }



        function findWidgetById(widgetId) {
            var result=[];
            for(var w in widgets) {
                if(widgets[w]._id == widgetId) {
                    result.push(widgets[w]);
                }
            }
            return result;

        }



        function deleteWidget(widgetId)   {
            for(var u in widgets) {
                var widget = widgets[u];
                if(widget._id === widgetId) {
                    delete widgets[u];
                }
            }

        }


        function updateWidget(widgetId, widget) {
            for(var u in widgets) {
                var us = widgets[u];
                if(us._id === widgetId) {
                    widgets[u]=widget;
                }
            }

        }


    }
})();