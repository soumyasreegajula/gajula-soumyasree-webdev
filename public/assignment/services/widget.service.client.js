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
                    var newWidget = {
                        _id: new Date().getTime(),
                        widgetType: widget.WidgetType,
                        pageId: pageId,
                        size:widget.size,
                        text:widet.text

                    };

                    widgets.push(newWidget);
                }
            }
            return null;
        }


        function findWidgetsByPageId(pageId)   {
            for (var w in widgets) {
                if (widgets[w].pageId === pageId) {
                    return widgets[w];
                }
            }
            return null;

        }



        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id == widgetId) {
                    return widgets[w];
                }
            }
            return null;
        }



        function deleteWidget(widgetId)   {
            for(var u in widgets) {
                var widget = widgets[u];
                if(widget._id === widgetId) {
                    widgets.remove(widgetId);
                }
            }
            return null;
        }


        function updateWidget(widgetId, widget) {
            for(var u in widgets) {
                var us = widgets[u];
                if(us._id === widgetId) {
                    us = widget;
                }
            }
            return null;
        }


    }
})();