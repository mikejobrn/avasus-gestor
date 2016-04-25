(() => {
    angular
        .module('AvasusGestor')
        .directive('agMapaCursos', agMapaCursos)

    agMapaCursos.$inject = ['Eventos']

    /* @ngInject */
    function agMapaCursos(Eventos) {
        var directive = {
            restrict: 'EA',
            templateUrl: 'js/templates/mapa-cursos/mapa-cursos.html',
            scope: {
                filtroString: '@filtro'
            },
            link: linkFunc,
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true
        }

        return directive

        function linkFunc(scope, el, attr, ctrl) {
            scope.$watch('vm.filtroString', () => {
                ctrl.activate()
            })

            scope.$on(Eventos.ATUALIZAR_DADOS, () => {
                ctrl.activate()
            })
        }
    }

    Controller.$inject = ['cursoService', '$scope']

    /* @ngInject */
    function Controller(cursoService, $scope) {
        let vm = this

        vm.carregando = true

        vm.visualizar = visualizar

        vm.activate = () => {
            vm.carregando = true

            if (vm.filtroString !== '') {
                vm.filtro = JSON.parse(vm.filtroString)
            } else {
                vm.filtro = ''
            }

            vm.config = getConfigMapa()

            Promise.all([
                carregarDadosRegiao(['ac', 'am', 'rr', 'ro', 'pa', 'ap', 'to'], 0),
                carregarDadosRegiao(['ma', 'pi', 'ce', 'rn', 'pb', 'pe', 'al', 'se', 'ba'], 1),
                carregarDadosRegiao(['ms', 'mt', 'go', 'df'], 2),
                carregarDadosRegiao(['sp', 'es', 'rj', 'mg'], 3),
                carregarDadosRegiao(['pr', 'sc', 'rs'], 4)
            ]).then(
                () => {
                    vm.erro = '';
                    vm.carregando = false;
                    $scope.$apply();
                },
                erro => {
                    if (erro.config.timeout && erro.config.timeout.$$state.processScheduled == null) {
                        vm.erro = erro
                        vm.carregando = false
                    }
                }
            )

            function carregarDadosRegiao(estados, idRegiao) {
                return Promise.all(
                    estados.map(estado => {
                        return cursoService.getResumoPorEstado(estado, vm.filtro).then(resultado => {
                            return {
                                'hc-key': 'br-' + estado,
                                'value': resultado.usuarios,
                                'certificados': resultado.certificados
                            }
                        })
                    })
                ).then(resultado => {
                    vm.config.series[idRegiao].data = resultado
                })
            }
        }

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
                            return `<div>
                                <strong>${this.point.name}</strong><br>
                                Inscritos: <span class="numero">${formatarNumero(this.point.value)}</span><br>
                                Certificados: <span class="numero">${formatarNumero(this.point.certificados)}</span>
                                </div>`;
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
            }
        }

        function formatarNumero(numero) {
            return Highcharts.numberFormat(numero, 0, ',', '.')
        }

        function visualizar() {
            return !vm.filtro || (
                vm.filtro.campo !== 'estado' &&
                vm.filtro.campo !== 'perfil' &&
                vm.filtro.campo !== 'cursos'
            )
        }
    }
})();
