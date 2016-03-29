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
            scope.$watch('vm.atualizacao', function (a) {
                ctrl.activate();
            });
        }
    }

    Controller.$inject = ['cursoService', '$scope', '$timeout'];

    /* @ngInject */
    function Controller(cursoService, $scope, $timeout) {
        var vm = this;

        vm.carregando = true;

        vm.activate = function() {
            vm.carregando = true;

            vm.configPizza = getConfigGraficoPizza();

            vm.configBarra = getConfigGraficoBarra();


            cursoService.getCursos(vm.filtro).then(
                function (resultado) {
                    vm.erro = '';

                    Highcharts.setOptions({
                        lang: {
                            decimalPoint: ',',
                            thousandsSep: '.'
                        }
                    });

                    var cursos = resultado.map(function (curso) {
                        return {
                            name: curso.curso,
                            y: curso.inscritos,
                            acessos: curso.acessos,
                            certificados: curso.certificados
                        };
                    });

                    var topCursos = getTop(cursos, 10);
                    vm.configPizza.series[0].data = topCursos;
                    vm.configBarra.series[0].data = topCursos;

                    $timeout(function() {
                      vm.carregando = false;
                    });

                },
                function(erro) {
                    vm.erro = erro;
                    vm.carregando = false;
                }
            );

            function plotar(dados) {

            }
        };

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
                            return '<div>' +
                                '<strong>' + this.point.name + '</strong><br>' +
                                'Inscritos: <span class="numero">' + formatarNumero(this.y) + '' +
                                ' <strong>(' + Highcharts.numberFormat(this.percentage, 1) + '%)</strong></span><br>' +
                                'Certificados: <span class="numero">' + formatarNumero(this.point.certificados) + '</span><br>' +
                                'Acessos: <span class="numero">' + formatarNumero(this.point.acessos) + '</span></div>';
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
            };
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
                            return '<div>' +
                                '<strong>' + this.point.name + '</strong><br>' +
                                'Inscritos: <span class="numero">' + formatarNumero(this.y) + '</span><br>' +
                                'Certificados: <span class="numero">' + formatarNumero(this.point.certificados) + '</span><br>' +
                                'Acessos: <span class="numero">' + formatarNumero(this.point.acessos) + '</span></div>';
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
            };
        }

        function formatarNumero(numero) {
            return  Highcharts.numberFormat(numero, 0, ',', '.');
        }

        function getTop(cursos, limite) {
            var cursosOrdenados = cursos.sort(function (a, b) {
                return b.y - a.y;
            });

            var topCursos = cursosOrdenados;

            if (cursosOrdenados.length > limite) {
                topCursos = cursosOrdenados.slice(0, limite - 1);
                topCursos.push(cursosOrdenados.slice(limite - 1).reduce(
                    function (total, curso) {
                        total.y += curso.y;
                        total.acessos += curso.acessos;
                        total.certificados += curso.certificados;
                        return total;
                    },
                    {
                        name: 'Outros',
                        y: 0,
                        acessos: 0,
                        certificados: 0
                    }
                ));
            }

            return topCursos;
        }
    }
})();
