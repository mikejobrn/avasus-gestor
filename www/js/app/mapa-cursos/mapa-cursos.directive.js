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

        vm.carregando = true;

        function activate() {
            vm.config = {
                chartType: 'map',
                title: {
                    text: null//'Usuários inscritos por região'
                },
                options: {
                    legend: {
                        enabled: false
                    },
                    mapNavigation: {
                        enabled: true,
                        buttonOptions: {
                            verticalAlign: 'bottom'
                        }
                    },
                    plotOptions: {
                        map: {
                            allAreas: false,
                            joinBy: ['hc-key'],
                            // dataLabels: {
                            //     enabled: false,
                            //     format: '{point.name}'
                            // },
                            // dataLabels: {
                            //     enabled: true,
                            //     color: '#FFFFFF',
                            //     formatter: function () {
                            //         if (this.point.properties && this.point.properties.labelrank.toString() < 5) {
                            //             return this.point.properties['iso-a2'];
                            //         }
                            //     },
                            //     format: null,
                            //     style: {
                            //         fontWeight: 'bold'
                            //     }
                            // },
                            borderColor: '#555',
                            // states: {
                            //     hover: {
                            //         color: corSelecao
                            //     }
                            // },
                            mapData: Highcharts.maps['countries/br/br-all'],
                            // tooltip: {
                            //     headerFormat: '',
                            //     pointFormat: '{point.name}: <b>{series.name}</b>'
                            // }
                        }
                    }
                },
                series : [
                    {
                        name: 'Norte',
                        color: '#7eceff'
                    },
                    {
                        name: 'Nordeste',
                        color: '#ffdb7d'
                    },
                    {
                        name: 'Centro-Oeste',
                        color: '#bcdf00'
                    },
                    {
                        name: 'Sudeste',
                        color: '#ff925f'
                    },
                    {
                        name: 'Sul',
                        color: '#c49fff'
                    }
                ]
            };

            Promise.all([
                carregarDadosRegiao(['ac', 'am', 'rr', 'ro', 'pa', 'ap', 'to'], 0),
                carregarDadosRegiao(['ma', 'pi', 'ce', 'rn', 'pb', 'pe', 'al', 'se', 'ba'], 1),
                carregarDadosRegiao(['ms', 'mt', 'go', 'df'], 2),
                carregarDadosRegiao(['sp', 'es', 'rj', 'mg'], 3),
                carregarDadosRegiao(['pr', 'sc', 'rs'], 4)
            ]).then(function() {
                vm.carregando = false;
            });

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
        }
    }
})();
