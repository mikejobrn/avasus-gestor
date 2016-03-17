(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .directive('agMapaCursos', agMapaCursos);

    /* @ngInject */
    function agMapaCursos() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'js/app/mapa-cursos/mapa-cursos.html',
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

    Controller.$inject = ['highchartsNG', 'cursoService', '$scope'];

    /* @ngInject */
    function Controller(highchartsNG, cursoService, $scope) {
        var vm = this;

        activate();

        function activate() {
            var corSelecao = '#f04847';
            var corBorda = '#555';

            vm.config = {
                options: {
                    legend: {
                        enabled: false
                    },
                    chart: {
                        borderColor: 'black'
                    },
                    mapNavigation: {
                        enabled: true,
                        buttonOptions: {
                            verticalAlign: 'bottom'
                        }
                    },
                },
                chartType: 'map',
                title : {
                    text : 'Usuários inscritos por região'
                },
                series : [
                    {
                        name: 'Norte',
                        allAreas: false,
                        data : [],
                        mapData: Highcharts.maps['countries/br/br-all'],
                        joinBy: ['hc-key'],
                        borderColor: corBorda,
                        color: '#7eceff',
                        states: {
                            hover: {
                                color: corSelecao
                            }
                        },
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}'
                        }
                    },
                    {
                        name: 'Nordeste',
                        allAreas: false,
                        data : [],
                        mapData: Highcharts.maps['countries/br/br-all'],
                        joinBy: ['hc-key'],
                        borderColor: corBorda,
                        color: '#ffdb7d',
                        states: {
                            hover: {
                                color: corSelecao
                            }
                        },
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}'
                        }
                    },
                    {
                        name: 'Centro-Oeste',
                        allAreas: false,
                        data : [],
                        mapData: Highcharts.maps['countries/br/br-all'],
                        joinBy: ['hc-key'],
                        borderColor: corBorda,
                        color: '#bcdf00',
                        states: {
                            hover: {
                                color: corSelecao
                            }
                        },
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}'
                        }
                    },
                    {
                        name: 'Sudeste',
                        allAreas: false,
                        data : [],
                        mapData: Highcharts.maps['countries/br/br-all'],
                        joinBy: ['hc-key'],
                        borderColor: corBorda,
                        color: '#ff925f',
                        states: {
                            hover: {
                                color: corSelecao
                            }
                        },
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}'
                        }
                    },
                    {
                        name: 'Sul',
                        allAreas: false,
                        data : [],
                        mapData: Highcharts.maps['countries/br/br-all'],
                        joinBy: ['hc-key'],
                        borderColor: corBorda,
                        color: '#c49fff',
                        states: {
                            hover: {
                                color: corSelecao
                            }
                        },
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}'
                        }
                    }
                ]
            };

            function carregarDadosRegiao(estados, idRegiao) {
                return Promise.all(
                    estados.map(function (estado) {
                        return cursoService.getResumoPorEstado(estado).then(function (resultado) {
                            return {
                                "hc-key": "br-" + estado,
                                "value": resultado.usuarios
                            };
                        });
                    })
                ).then(function (resultado) {
                    vm.config.series[idRegiao].data = resultado;
                });
            }

            Promise.all([
                carregarDadosRegiao(['ac', 'am', 'rr', 'ro', 'pa', 'ap', 'to'], 0),
                carregarDadosRegiao(['ma', 'pi', 'ce', 'rn', 'pb', 'pe', 'al', 'se', 'ba'], 1),
                carregarDadosRegiao(['sp', 'es', 'rj', 'mg'], 2),
                carregarDadosRegiao(['pr', 'sc', 'rs'], 3),
                carregarDadosRegiao(['ms', 'mt', 'go', 'df'], 4)
            ]).then(function() {
                $scope.$apply();
            });

        }
    }
})();
