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
                filtro: '=',
                atualizacao: '='
            },
            link: linkFunc,
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            // scope.$watch('vm.filtro', function (a) {
            //     ctrl.activate();
            // });

            scope.$watch('vm.atualizacao', function (a) {
                ctrl.activate();
            });
        }
    }

    Controller.$inject = ['cursoService', '$scope'];

    /* @ngInject */
    function Controller(cursoService, $scope) {
        var vm = this;

        vm.carregando = true;

        vm.activate = function() {
            vm.carregando = true;

            vm.config = getConfigMapa();

            Promise.all([
                carregarDadosRegiao(['ac', 'am', 'rr', 'ro', 'pa', 'ap', 'to'], 0),
                carregarDadosRegiao(['ma', 'pi', 'ce', 'rn', 'pb', 'pe', 'al', 'se', 'ba'], 1),
                carregarDadosRegiao(['ms', 'mt', 'go', 'df'], 2),
                carregarDadosRegiao(['sp', 'es', 'rj', 'mg'], 3),
                carregarDadosRegiao(['pr', 'sc', 'rs'], 4)
            ]).then(
                function() {
                    vm.erro = '';
                    vm.carregando = false;
                    $scope.$apply();
                },
                function(erro) {
                    if (erro.config.timeout && erro.config.timeout.$$state.processScheduled == null) {
                        vm.erro = erro;
                        vm.carregando = false;
                    }
                }
            );

            function carregarDadosRegiao(estados, idRegiao) {
                return Promise.all(
                    estados.map(function (estado) {
                        return cursoService.getResumoPorEstado(estado, vm.filtro).then(function (resultado) {
                            return {
                                'hc-key': 'br-' + estado,
                                'value': resultado.usuarios,
                                'certificados': resultado.certificados
                            };
                        });
                    })
                ).then(function (resultado) {
                    vm.config.series[idRegiao].data = resultado;
                });
            }
        };

        function getConfigMapa() {
            return {
                chartType: 'map',
                title: {
                    text: null
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
                    tooltip: {
                        style: {
                            padding: 10
                        },
                        borderWidth: 0,
                        useHTML: true,
                        formatter: function() {
                            return '<div>' +
                                '<strong>' + this.point.name + '</strong><br>' +
                                'Inscritos: <span class="numero">' + formatarNumero(this.point.value) + '</span><br>' +
                                'Certificados: <span class="numero">' + formatarNumero(this.point.certificados) + '</span>' +
                                '</div>';
                        }
                    },
                    plotOptions: {
                        map: {
                            allAreas: false,
                            joinBy: ['hc-key'],
                            borderColor: '#777',
                            mapData: Highcharts.maps['countries/br/br-all']
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
        }

        function formatarNumero(numero) {
            return Highcharts.numberFormat(numero, 0, ',', '.');
        }
    }
})();
