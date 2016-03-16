(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .directive('agGraficoCursos', agGraficoCursos);

    /* @ngInject */
    function agGraficoCursos() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'js/app/grafico-cursos/grafico-cursos.html',
            scope: {
            },
            link: linkFunc,
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {

        }
    }

    Controller.$inject = ['highchartsNG'];

    /* @ngInject */
    function Controller(highchartsNG) {
        var vm = this;

        activate();

        function activate() {
            highchartsNG.ready(function(){
                vm.chartConfig = {

              options: {
                  //This is the Main Highcharts chart config. Any Highchart options are valid here.
                  //will be overriden by values specified below.
                  chart: {
                      type: 'bar'
                  },
                  tooltip: {
                      style: {
                          padding: 10,
                          fontWeight: 'bold'
                      }
                  }
              },
              //The below properties are watched separately for changes.

              //Series object (optional) - a list of series using normal Highcharts series options.
              series: [{
                 data: [10, 15, 12, 8, 7]
              }],
              //Title configuration (optional)
              title: {
                 text: 'Hello'
              },
              //Boolean to control showing loading status on chart (optional)
              //Could be a string if you want to show specific loading text.
              loading: false,
              //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
              //properties currentMin and currentMax provided 2-way binding to the chart's maximum and minimum
              xAxis: {
              currentMin: 0,
              currentMax: 20,
              title: {text: 'values'}
              },
              //Whether to use Highstocks instead of Highcharts (optional). Defaults to false.
              useHighStocks: false,
              //size (optional) if left out the chart will default to size of the div or something sensible.
              size: {
               width: 400,
               height: 300
              },
              //function (optional)
              func: function (chart) {
               //setup some logic for the chart
              }
            };
            }, vm);
        }
    }
})();
