(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .directive('agGraficoInscricoesMes', agGraficoInscricoesMes);

    /* @ngInject */
    function agGraficoInscricoesMes() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'js/app/grafico-inscricoes-mes/grafico-inscricoes-mes.html',
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

            // scope.$watch('vm.atualizacao', function (a) {
            //     ctrl.activate();
            // });
        }
    }

    Controller.$inject = ['$http', 'avasusService', '$scope', '$timeout', '$window'];

    /* @ngInject */
    function Controller($http, avasusService, $scope, $timeout, $window) {
        var vm = this;

        vm.carregando = true;

        vm.activate = function() {
            vm.carregando = true;

            setLocalePtBr();

            vm.config = getConfigMapa();

            getData();
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
                            return '<div>' +
                                '<strong>' + moment(this.x).format('MMM/YYYY') + '</strong><br>' +
                                this.series.name + ': <span class="numero">' + formatarNumero(this.y) + '' +
                                '</div>';
                        }
                    },
                    plotOptions: {
                        series: {
                            marker : {
                                enabled : true,
                                radius : 5
                            },
                            shadow : true,
                            // color: '#f04847'
                        }
                    }
                },
                title : {
                    text: ''
                },
                series: [],
                // series : [{
                //     name : 'Inscritos',
                // }],
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
            };
        }

        function setLocalePtBr() {
            moment.locale('pt-br');

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
            });
        }

        function getData() {
            var data = moment('2015-05-01');
            var urls = [];
            while (data < moment().endOf('month')) {
                urls.push(avasusService.getUrl('widesus_dashboard', '&data=' + data.endOf('month').format('DD/MM/YYYY')));
                data.add(1, 'months');
            }

            // if (data != moment()) {
            //     urls.push(avasusService.getUrl('widesus_dashboard', '&data=' + moment().add(1, 'days').format('DD/MM/YYYY')));
            // }

            var resultado = urls.map(function(url) {
                return $http.get(url).then(function(res) {
                    return res.data;
                });
            });

            return Promise.all(resultado).then(function(resultadoCarregado) {
                console.log('Usuários:');
                console.log(resultadoCarregado.map(function(r) { return r.usuarios; }));

                console.log('Inscritos:');
                console.log(resultadoCarregado.map(function(r) { return r.inscritos; }));

                var diferencas = resultadoCarregado.slice(1).map(function(res, i) {
                    return {
                        usuarios: res.usuarios - resultadoCarregado[i].usuarios,
                        inscritos: res.inscritos - resultadoCarregado[i].inscritos
                    };
                });

                console.log('Usuários (soma das diferenças):');
                console.log(diferencas.reduce(function(total, i) {
                    return total += i.usuarios;
                }, 0));

                console.log('Inscritos (soma das diferenças):');
                console.log(diferencas.reduce(function(total, i) {
                    return total += i.inscritos;
                }, 0));

                var totalInscritos = [];
                var totalUsuarios = [];

                var data = moment('2015-06-01');
                var i = 0;
                while (i < diferencas.length) {
                    totalInscritos.push([data.format('X') * 1000, diferencas[i].inscritos]);
                    totalUsuarios.push([data.format('X') * 1000, diferencas[i].usuarios]);
                    data.add(1, 'months');
                    i++;
                }

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
                            return '<div>' +
                                '<strong>' + moment(this.x).format('MMM/YYYY') + '</strong><br>' +
                                'Inscritos: <span class="numero">' + formatarNumero(this.y) + '' +
                                '</div>';
                        }
                    },
                });

                vm.config.series.push({
                    name: 'Usuários',
                    data: totalUsuarios,
                    tooltip : {
                        style: {
                            padding: 10
                        },
                        borderWidth: 0,
                        useHTML: true,
                        formatter: function() {
                            return '<div>' +
                                '<strong>' + moment(this.x).format('MMM/YYYY') + '</strong><br>' +
                                'Usuários: <span class="numero">' + formatarNumero(this.y) + '' +
                                '</div>';
                        }
                    },
                });

                vm.carregando = false;
            });
        }

        function formatarNumero(numero) {
            return Highcharts.numberFormat(numero, 0, ',', '.');
        }
    }
})();
