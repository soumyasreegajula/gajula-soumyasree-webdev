/**
 * Created by Soumya on 11/2/16.
 */
(function(){
    angular
        .module("jga-directives",[])
        .directive("sortable",sortable);
    function sortable(){
        function linker(scope,element,attributes){
            var start=-1;
            var end=-1;

            element = $(element);
            element
                .sortable({
                    start:function(event,ui){
                        start=$(ui.item).index();

                    },
                    stop:function(event,ui){
                        end=$(ui.item).index();
                        scope.sortableController.sort(start,end);

                    }
                });

        }

        return{
            scope:{},
            link:linker,
            controller: sortableController,
            controllerAs:'sortableController'
        }
    }
    function sortableController($routeParams,WidgetService){
        var vm=this;
        vm.sort = sort;
        vm.pageId=$routeParams['pid'];
        console.log(vm.pageId);
        function sort(start,end){
            WidgetService.sort(vm.pageId,start,end);
        }
    }
})();