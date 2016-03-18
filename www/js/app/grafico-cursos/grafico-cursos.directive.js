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

    Controller.$inject = ['highchartsNG', 'avasusService', '$http', '$scope'];

    /* @ngInject */
    function Controller(highchartsNG, avasusService, $http, $scope) {
        var vm = this;

        activate();

        vm.carregando = true;

        function activate() {
            // highchartsNG.ready(function(){
                vm.config = {

                    options: {
                        //This is the Main Highcharts chart config. Any Highchart options are valid here.
                        //will be overriden by values specified below.
                        chart: {
                            type: 'pie'
                        },
                        tooltip: {
                            pointFormat: 'Acessos: {point.y} ({point.percentage:.1f}%)',
                            style: {
                                padding: 10
                            }//,
                            // useHTML: true,
                            // formatter: function() {
                            //     return "<div style='white-space:normal; min-width:100px; max-width:200px'>" +
                            //         "<b>" + this.point.name + "</b><br>" +
                            //         "Acessos: " + this.y + " (" + Highcharts.numberFormat(this.percentage, 2) + "%)</div>";
                            // }
                        },
                        plotOptions: {
                            pie: {
                                // allowPointSelect: true,
                                dataLabels: {
                                    enabled: false
                                }
                            }
                        }
                    },
                    //The below properties are watched separately for changes.

                    //Series object (optional) - a list of series using normal Highcharts series options.
                    series: [{ data: [] }],
                    // series: [{
                    //     data: [{
                    //         name: 'Estimulação Precoce',
                    //         y: 30
                    //     }, {
                    //         name: 'Combate ao Aedes Aegypti',
                    //         y: 22
                    //     }, {
                    //         name: 'Oxigenoterapia',
                    //         y: 12
                    //     }, {
                    //         name: 'Teste',
                    //         y: 8
                    //     }, {
                    //         name: 'Outros',
                    //         y: 7
                    //     }]
                    // }],
                    //Title configuration (optional)
                    title: {
                        text: null
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
                        width: 300,
                        height: 300
                    },
                    //function (optional)
                    func: function (chart) {
                    //setup some logic for the chart
                    }
                };
            // }, vm);

            var url = avasusService.getUrl('widesus_dashboard_curso');
            $http.get(url).then(
                function (resultado) {
                    var cursos = resultado.data.map(function (curso) {
                        return {
                            name: curso.curso,
                            y: curso.acessos
                        };
                    });

                    var cursosOrdenados = cursos.sort(function (a, b) {
                        return b.y - a.y;
                    });

                    var topCursos = cursosOrdenados;
                    var limite = 10;
                    if (cursosOrdenados.length > limite) {
                        topCursos = cursosOrdenados.slice(0, limite - 1);
                        topCursos.push({
                            name: 'Outros',
                            y: cursosOrdenados.slice(limite - 1).reduce(
                                function (total, curso) {
                                    return total + curso.y;
                                },
                                0
                            )
                        });
                    }

                    vm.config.series[0].data = topCursos;

                    vm.carregando = false;
                }
            );
        }
    }
})();
