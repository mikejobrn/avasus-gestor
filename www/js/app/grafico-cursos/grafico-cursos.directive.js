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

    Controller.$inject = ['cursoService', '$scope'];

    /* @ngInject */
    function Controller(cursoService, $scope) {
        var vm = this;

        vm.carregando = true;

        vm.activate = function() {
            vm.carregando = true;

            vm.config = getConfigGrafico();

            vm.config2 = getConfigGrafico2();

            cursoService.getDetalhes(vm.filtro).then(
                function (resultado) {
                    vm.erro = '';

                    var cursos = resultado.map(function (curso) {
                        return {
                            name: curso.curso,
                            y: curso.inscritos,
                            acessos: curso.acessos,
                            certificados: curso.certificados
                        };
                    });

                    vm.config.series[0].data = getTop(cursos, 10);

                    var cursos2 = getTop(cursos, 10);
                    cursos2.map(function(c) {
                        vm.config2.series.push({
                            name: c.name,
                            data: c
                        });
                    });
                    // vm.config2.series[0].data = ;
                    vm.carregando = false;
                },
                function(erro) {
                    vm.erro = erro;
                    vm.carregando = false;
                }
            );

            function plotar(dados) {

            }
        };

        function getConfigGrafico() {
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

        function getConfigGrafico2() {
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
                },
                series: [{ data: [] }],
                title: {
                    text: null
                },
            };
        }

        function getDadosTeste() {
            return [{"cursoid":42,"acessos":1,"inscritos":0,"certificados":0,"curso":"import res multi prof"},{"cursoid":6,"acessos":39,"inscritos":1,"certificados":0,"curso":"Teste"},{"cursoid":37,"acessos":106336,"inscritos":9544,"certificados":424,"curso":"M\u00f3dulo de Estimula\u00e7\u00e3o Precoce"},{"cursoid":19,"acessos":21713,"inscritos":955,"certificados":168,"curso":"Curso Introdut\u00f3rio para Agente de Combate \u00e0s Endemias (ACE)"},{"cursoid":17,"acessos":7432,"inscritos":458,"certificados":107,"curso":"Curso para instrutores do curso introdut\u00f3rio presencial para agentes comunit\u00e1rios de sa\u00fade (ACS)"},{"cursoid":10,"acessos":136,"inscritos":2,"certificados":0,"curso":"Abordagem do Rece\u0301m-Nascido"},{"cursoid":18,"acessos":6558,"inscritos":449,"certificados":116,"curso":"Curso para instrutores do curso introdut\u00f3rio presencial para agente de combate \u00e0s endemias (ACE)"},{"cursoid":3,"acessos":2140,"inscritos":3,"certificados":0,"curso":"Conhecendo as atividades de EaD do 2\u00ba Ciclo do Mais M\u00e9dicos e o AVASUS"},{"cursoid":9,"acessos":64,"inscritos":2,"certificados":0,"curso":"Abordagem da Crian\u00e7a com Anemia Falciforme e Fibrose Ci\u0301stica"},{"cursoid":36,"acessos":6463,"inscritos":554,"certificados":147,"curso":"Oxigenoterapia e ventila\u00e7\u00e3o mec\u00e2nica em aten\u00e7\u00e3o domiciliar"},{"cursoid":35,"acessos":43,"inscritos":1,"certificados":0,"curso":"Abordagem da Viol\u00eancia na Aten\u00e7\u00e3o Domiciliar"},{"cursoid":34,"acessos":25842,"inscritos":1066,"certificados":237,"curso":"Autocuidado: como apoiar a pessoa com diabetes - n\u00edvel superior"},{"cursoid":33,"acessos":4185,"inscritos":255,"certificados":132,"curso":"Curso Introdut\u00f3rio em Pr\u00e1ticas Integrativas e Complementares: Antroposofia Aplicada \u00e0 Sa\u00fade"},{"cursoid":27,"acessos":32558,"inscritos":1885,"certificados":622,"curso":"Campos e Floresta"},{"cursoid":31,"acessos":103480,"inscritos":4651,"certificados":1893,"curso":"Curso de Atualiza\u00e7\u00e3o no Combate Vetorial ao Aedes aegypti"},{"cursoid":13,"acessos":86999,"inscritos":1745,"certificados":1282,"curso":"HPV"},{"cursoid":30,"acessos":78002,"inscritos":3875,"certificados":1392,"curso":"Curso de Atualiza\u00e7\u00e3o no Combate Vetorial ao Aedes aegypti (Instrucional)"},{"cursoid":29,"acessos":30105,"inscritos":1175,"certificados":469,"curso":"Curso de Atualiza\u00e7\u00e3o no Combate Vetorial ao Aedes aegypti (Certificado)"},{"cursoid":28,"acessos":18139,"inscritos":731,"certificados":388,"curso":"Doen\u00e7as Cr\u00f4nicas nas Redes de Aten\u00e7\u00e3o \u00e0 Sa\u00fade"},{"cursoid":26,"acessos":29,"inscritos":0,"certificados":0,"curso":"[OLD] Oxigenoterapia e ventila\u00e7\u00e3o mec\u00e2nica em aten\u00e7\u00e3o domiciliar [OLD]"},{"cursoid":15,"acessos":30368,"inscritos":891,"certificados":766,"curso":"Abordagem do Rece\u0301m-Nascido"},{"cursoid":25,"acessos":43,"inscritos":0,"certificados":0,"curso":"S\u00edndromes mais frequentes na inf\u00e2ncia"},{"cursoid":24,"acessos":14570,"inscritos":687,"certificados":203,"curso":"Implanta\u00e7\u00e3o e Gerenciamento de um Servi\u00e7o de Aten\u00e7\u00e3o Domiciliar \u2013 SAD"},{"cursoid":23,"acessos":11357,"inscritos":253,"certificados":228,"curso":"Abordagem da Crian\u00e7a com Anemia Falciforme e Fibrose Ci\u0301stica"},{"cursoid":21,"acessos":83956,"inscritos":896,"certificados":419,"curso":"Abordagem domiciliar de situa\u00e7\u00f5es cl\u00ednicas comuns em adultos"},{"cursoid":16,"acessos":29959,"inscritos":1459,"certificados":1127,"curso":"Acolhimento ao usu\u00e1rio com dor no aparelho locomotor"},{"cursoid":12,"acessos":137038,"inscritos":2439,"certificados":1292,"curso":"Como Utilizar o AVASUS"},{"cursoid":14,"acessos":90129,"inscritos":1698,"certificados":1321,"curso":"Utiliza\u00e7\u00e3o racional e otimizada da ultrassonografia diagn\u00f3stica"},{"cursoid":20,"acessos":25279,"inscritos":778,"certificados":179,"curso":"Curso Introdut\u00f3rio para Agente Comunit\u00e1rio de Sa\u00fade (ACS)"},{"cursoid":1,"acessos":229017,"inscritos":0,"certificados":0,"curso":"AVASUS"},{"cursoid":41,"acessos":1241,"inscritos":57,"certificados":0,"curso":"Resid\u00eancia Multiprofissional - Pol\u00edticas de Sa\u00fade"},{"cursoid":22,"acessos":14,"inscritos":1,"certificados":0,"curso":"Teste LGBT"},{"cursoid":11,"acessos":34,"inscritos":0,"certificados":0,"curso":"Conhecendo as atividades de EaD do 2\u00ba Ciclo do Mais M\u00e9dicos e o AVASUS (25\/09)"},{"cursoid":8,"acessos":157,"inscritos":2,"certificados":0,"curso":"HPV"},{"cursoid":7,"acessos":483,"inscritos":2,"certificados":0,"curso":"Abordagem domiciliar de situa\u00e7\u00f5es cl\u00ednicas comuns em adultos"},{"cursoid":5,"acessos":264,"inscritos":1,"certificados":0,"curso":"HPV_"}];
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
