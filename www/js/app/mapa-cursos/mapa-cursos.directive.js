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

    Controller.$inject = ['highchartsNG'];

    /* @ngInject */
    function Controller(highchartsNG) {
        var vm = this;

        activate();

        function activate() {
            var norte = [
                {
                    "hc-key": "br-am",
                    "value": 45
                },
                {
                    "hc-key": "br-pa",
                    "value": 654
                },
                {
                    "hc-key": "br-rr",
                    "value": 12
                },
                {
                    "hc-key": "br-ro",
                    "value": 20
                },
                {
                    "hc-key": "br-to",
                    "value": 3
                },
                {
                    "hc-key": "br-ap",
                    "value": 5
                },
                {
                    "hc-key": "br-ac",
                    "value": 0
                },
            ];
            var nordeste = [
                {
                    "hc-key": "br-ma",
                    "value": 564
                },
                {
                    "hc-key": "br-pi",
                    "value": 465
                },
                {
                    "hc-key": "br-ce",
                    "value": 214
                },
                {
                    "hc-key": "br-rn",
                    "value": 3542
                },
                {
                    "hc-key": "br-pb",
                    "value": 231
                },
                {
                    "hc-key": "br-pe",
                    "value": 5465
                },
                {
                    "hc-key": "br-se",
                    "value": 564
                },
                {
                    "hc-key": "br-al",
                    "value": 654
                },
                {
                    "hc-key": "br-ba",
                    "value": 55
                },
            ];
            var centroOeste = [
                {
                    "hc-key": "br-go",
                    "value": 5623
                },
                {
                    "hc-key": "br-df",
                    "value": 212
                },
                {
                    "hc-key": "br-mt",
                    "value": 132
                },
                {
                    "hc-key": "br-ms",
                    "value": 231
                },
            ];
            var sudeste = [
                {
                    "hc-key": "br-sp",
                    "value": 10432
                },
                {
                    "hc-key": "br-mg",
                    "value": 1450
                },
                {
                    "hc-key": "br-es",
                    "value": 3210
                },
                {
                    "hc-key": "br-rj",
                    "value": 7804
                }
            ];
            var sul = [
                {
                    "hc-key": "br-sc",
                    "value": 321
                },
                {
                    "hc-key": "br-rs",
                    "value": 46
                },
                {
                    "hc-key": "br-pr",
                    "value": 987
                }
            ];
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
                        data : norte,
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
                        data : nordeste,
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
                        data : centroOeste,
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
                        data : sudeste,
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
                        data : sul,
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
        }
    }
})();
