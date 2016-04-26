(() => {
    angular
        .module('AvasusGestor')
        .directive('agGraficoInscricoesMes', agGraficoInscricoesMes)

    agGraficoInscricoesMes.$inject = ['Eventos']

    /* @ngInject */
    function agGraficoInscricoesMes(Eventos) {
        var directive = {
            restrict: 'EA',
            templateUrl: 'js/templates/grafico-inscricoes-mes/grafico-inscricoes-mes.html',
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

    Controller.$inject = ['$http', 'avasusService', '$scope', '$timeout', '$window',
      'dadosGeraisService', 'Highcharts', 'Moment']

    /* @ngInject */
    function Controller($http, avasusService, $scope, $timeout, $window,
        dadosGeraisService, Highcharts, Moment) {

        let vm = this

        vm.carregando = true

        vm.visualizar = visualizar

        vm.activate = function() {
            vm.carregando = true

            if (vm.filtroString !== '') {
                vm.filtro = JSON.parse(vm.filtroString)
            } else {
                vm.filtro = ''
            }

            setLocalePtBr()

            vm.config = getConfigMapa()

            getData()
        };

        function getConfigMapa() {
            return {
                options: {
                    chart: {
                        type: 'spline'
                    },
                    rangeSelector: {
                        enabled: false
                    },
                    legend: {
                        enabled: true
                    },
                    tooltip : {
                        style: {
                            padding: 10
                        },
                        borderWidth: 0,
                        useHTML: true,
                        formatter: function() {
                            return `<div>
                                <strong>${Moment(this.x).format('MMM/YYYY')}</strong><br>
                                ${this.series.name}: <span class="numero">${formatarNumero(this.y)}
                                </div>`;
                        }
                    },
                    plotOptions: {
                        series: {
                            marker : {
                                enabled : true,
                                radius : 5
                            },
                            shadow : true
                        }
                    }
                },
                title : {
                    text: ''
                },
                series: [],
                xAxis: {
                    type: 'datetime'
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    labels: {
                        format: '{value:.,0f}'
                    },
                }
            }
        }

        function setLocalePtBr() {
            Moment.locale('pt-br')

            Highcharts.setOptions({
              	lang: {
                		months: [
                            'Janeiro',
                            'Fevereiro',
                            'Março',
                            'Abril',
                            'Maio',
                            'Junho',
                            'Julho',
                            'Agosto',
                            'Setembro',
                            'Outubro',
                            'Novembro',
                            'Dezembro'
                        ],
                        shortMonths : [
                            'Jan',
                            'Fev',
                            'Mar',
                            'Abr',
                            'Mai',
                            'Jun',
                            'Jul',
                            'Ago',
                            'Set',
                            'Out',
                            'Nov',
                            'Dez'
                        ],
                		weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
              	}
            })
        }

        function getData() {
            let data = Moment('2015-05-01')
            var resultado = []
            while (data < Moment().endOf('month')) {
                resultado.push(dadosGeraisService.getPorMes(data, vm.filtro))
                data.add(1, 'months')
            }

            return Promise.all(resultado).then(
                resultadoCarregado => {
                    let diferencas = resultadoCarregado.slice(1).map((res, i) => {
                        return {
                            usuarios: res.usuarios - resultadoCarregado[i].usuarios,
                            inscritos: res.inscritos - resultadoCarregado[i].inscritos
                        }
                    })

                    let totalInscritos = []
                    let totalUsuarios = []

                    let data = Moment('2015-06-01')
                    let i = 0
                    while (i < diferencas.length) {
                        totalInscritos.push([data.format('X') * 1000, diferencas[i].inscritos])
                        totalUsuarios.push([data.format('X') * 1000, diferencas[i].usuarios])
                        data.add(1, 'months')
                        i++
                    }

                    vm.config.series = []

                    vm.config.series.push({
                        name: 'Matrícula',
                        color: '#f04847',
                        data: totalInscritos,
                        tooltip : {
                            style: {
                                padding: 10
                            },
                            borderWidth: 0,
                            useHTML: true,
                            formatter: function() {
                                return `<div>
                                    <strong>${Moment(this.x).format('MMM/YYYY')}</strong><br>
                                    Inscritos: <span class="numero">${formatarNumero(this.y)}
                                    </div>`;
                            }
                        },
                    });

                    vm.config.series.push({
                        name: 'Usuários',
                        color: '#52b99b',
                        data: totalUsuarios,
                        tooltip : {
                            style: {
                                padding: 10
                            },
                            borderWidth: 0,
                            useHTML: true,
                            formatter: function() {
                                return `<div>
                                    <strong>${Moment(this.x).format('MMM/YYYY')}</strong><br>
                                    Usuários: <span class="numero">${formatarNumero(this.y)}
                                    </div>`;
                            }
                        },
                    });

                    vm.carregando = false
                },
                erro => {
                    if (erro.config.timeout && erro.config.timeout.$$state.processScheduled == null) {
                        vm.erro = erro
                        vm.carregando = false
                    }
                }
            );
        }

        function formatarNumero(numero) {
            return Highcharts.numberFormat(numero, 0, ',', '.')
        }

        function visualizar () {
          return (!vm.filtro || Object.keys(vm.filtro).length === 0) ||
            (vm.filtro && vm.filtro.campo &&  vm.filtro.campo !== 'perfil' && vm.filtro.campo !== 'cursos')
        }
    }
})();
