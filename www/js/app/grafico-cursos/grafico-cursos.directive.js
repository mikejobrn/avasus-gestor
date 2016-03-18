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
            scope.$watch('vm.filtro', function (a) {
                ctrl.activate();
            });

            scope.$watch('vm.atualizacao', function (a) {
                ctrl.activate();
            });
        }
    }

    Controller.$inject = ['highchartsNG', 'cursoService', '$scope'];

    /* @ngInject */
    function Controller(highchartsNG, cursoService, $scope) {
        var vm = this;

        vm.carregando = true;

        vm.activate = function() {
            vm.carregando = true;

            vm.config = getConfigMapa();

            cursoService.getDetalhes(vm.filtro).then(
                function (resultado) {
                    var cursos = resultado.map(function (curso) {
                        return {
                            name: curso.curso,
                            y: curso.inscritos,
                            acessos: curso.acessos,
                            certificados: curso.certificados
                        };
                    });

                    vm.config.series[0].data = getTop(cursos, 10);
                    vm.carregando = false;
                },
                function(erro) {
                    vm.erro = erro;
                    vm.carregando = false;
                }
            );
        };

        function getConfigMapa() {
            return {
                options: {
                    chart: {
                        type: 'pie'
                    },
                    tooltip: {
                        style: {
                            padding: 10
                        },
                        useHTML: true,
                        formatter: function() {
                            return "<div>" +
                                "<strong>" + this.point.name + "</strong><br>" +
                                "Inscritos: " + Highcharts.numberFormat(this.y, 0) +
                                " (" + Highcharts.numberFormat(this.percentage, 1) + "%)<br>" +
                                "Certificados: " + Highcharts.numberFormat(this.point.certificados, 0) + "<br>" +
                                "Acessos: " + Highcharts.numberFormat(this.point.acessos, 0) + "</div>";
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
                },
                size: {
                    width: 300,
                    height: 300
                }
            };
        }

        function getTop(cursos, limite) {
            var cursosOrdenados = cursos.sort(function (a, b) {
                return b.y - a.y;
            });

            var topCursos = cursosOrdenados;

            if (cursosOrdenados.length > limite) {
                topCursos = cursosOrdenados.slice(0, limite - 1);
                topCursos.push({
                    name: 'Outros',
                    y: cursosOrdenados.slice(limite - 1).reduce(
                        function (total, curso) {
                            return total + curso.y;
                        },
                        0
                    ),
                    acessos: cursosOrdenados.slice(limite - 1).reduce(
                        function (total, curso) {
                            return total + curso.acessos;
                        },
                        0
                    ),
                    certificados: cursosOrdenados.slice(limite - 1).reduce(
                        function (total, curso) {
                            return total + curso.certificados;
                        },
                        0
                    )
                });
            }

            return topCursos;
        }
    }
})();
