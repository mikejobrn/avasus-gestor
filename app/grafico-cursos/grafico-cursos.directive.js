(() => {
    angular
        .module('AvasusGestor')
        .directive('agGraficoCursos', agGraficoCursos)

    agGraficoCursos.$inject = ['Eventos']

    /* @ngInject */
    function agGraficoCursos(Eventos) {
        var directive = {
            restrict: 'EA',
            templateUrl: 'js/templates/grafico-cursos/grafico-cursos.html',
            scope: {
            },
            link: linkFunc,
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true
        }

        return directive

        function linkFunc(scope, el, attr, ctrl) {
            scope.$watch('vm.filtro', () => {
                ctrl.activate()
            })

            scope.$on(Eventos.ATUALIZAR_DADOS, () => {
                ctrl.activate()
            })
        }
    }

    Controller.$inject = ['cursoService', '$scope', '$timeout', 'Highcharts', 'filtroService']

    /* @ngInject */
    function Controller(cursoService, $scope, $timeout, Highcharts, filtroService) {
        var vm = this

        vm.activate = activate
        vm.visualizar = visualizar
        vm.status = {}
        vm.status.visivel = visualizar

        function activate () {
            vm.status.sucesso = false
            vm.status.erro = false

            $scope.$watch(() => filtroService.get(), () => {
                vm.filtro = filtroService.get()
            })

            if (vm.filtro) {
                vm.subtitulo = `${vm.filtro.campo} - ${vm.filtro.descricao || vm.filtro.valor}`
            }


            vm.configPizza = getConfigGraficoPizza()

            vm.configBarra = getConfigGraficoBarra()


            cursoService.getCursos(vm.filtro).then(
                resultado => {
                    vm.erro = ''

                    Highcharts.setOptions({
                        lang: {
                            decimalPoint: ',',
                            thousandsSep: '.'
                        }
                    })

                    let cursos = resultado.map(curso => {
                        return {
                            name: curso.curso,
                            y: curso.inscritos,
                            acessos: curso.acessos,
                            certificados: curso.certificados
                        }
                    })

                    let topCursos = getTop(cursos, 10)
                    vm.configPizza.series[0].data = topCursos
                    vm.configBarra.series[0].data = topCursos

                    vm.status.sucesso = true
                },
                erro => {
                    if (erro.config.timeout && erro.config.timeout.$$state.processScheduled == null) {
                        vm.status.erro = true
                    }
                }
            )
        }

        function getConfigGraficoPizza() {
            return {
                options: {
                    chart: {
                        type: 'pie'
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
                                Inscritos: <span class="numero">${formatarNumero(this.y)}
                                <strong>(${Highcharts.numberFormat(this.percentage, 1)}%)</strong></span><br>
                                Certificados: <span class="numero">${formatarNumero(this.point.certificados)}</span><br>
                                Acessos: <span class="numero">${formatarNumero(this.point.acessos)}</span></div>`;
                        }
                    },
                    plotOptions: {
                        pie: {
                            dataLabels: {
                                enabled: false
                            }
                        }
                    }
                },
                series: [{ data: [] }],
                title: {
                    text: null
                }
            }
        }

        function getConfigGraficoBarra() {
            return {
                options: {
                    chart: {
                        type: 'bar'
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
                                Inscritos: <span class="numero">${formatarNumero(this.y)}</span><br>
                                Certificados: <span class="numero">${formatarNumero(this.point.certificados)}</span><br>
                                Acessos: <span class="numero">${formatarNumero(this.point.acessos)}</span></div>`;
                        }
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: false
                            }
                        }
                    },
                    xAxis: {
                        type: 'category'
                    },
                    yAxis: {
                        title: {
                            text: ''
                        },
                        labels: {
                            format: '{value:.,0f}',
                            align: 'right'
                        }
                    },
                    legend: {
                        enabled: false
                    }
                },
                series: [{
                    data: [],
                    colorByPoint: true
                }],
                title: {
                    text: null
                }
            }
        }

        function formatarNumero(numero) {
            return Highcharts.numberFormat(numero, 0, ',', '.')
        }

        function getTop(cursos, limite) {
            let cursosOrdenados = cursos.sort((a, b) => b.y - a.y)

            let topCursos = cursosOrdenados

            if (cursosOrdenados.length > limite) {
                topCursos = cursosOrdenados.slice(0, limite - 1)
                topCursos.push(cursosOrdenados.slice(limite - 1).reduce(
                    (total, curso) => {
                        total.y += curso.y
                        total.acessos += curso.acessos
                        total.certificados += curso.certificados
                        return total
                    },
                    {
                        name: 'Outros',
                        y: 0,
                        acessos: 0,
                        certificados: 0
                    }
                ))
            }

            return topCursos
        }

        function visualizar() {
            return (!vm.filtro || Object.keys(vm.filtro).length === 0) ||
                (vm.filtro && vm.filtro.campo && vm.filtro.campo !== 'curso')
        }
    }
})();
