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

            getConfigMapa();

            getData();
        };

        function getConfigMapa() {
            $http
                .jsonp('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=JSON_CALLBACK')
                .then(
                    function (data) {
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
                        vm.config = {
                            options: {
                                chart: {
                                    events: {
                                        load: function(chart) {
                                            $timeout(function() {
                                                chart.target.reflow();
                                            });
                                        }
                                    }
                                },
                                rangeSelector: {
                                    enabled: false
                                },
                                legend: {
                                    enabled: false
                                },
                                tooltip : {
                                    style: {
                                        padding: 10
                                    },
                                    borderWidth: 0,
                                    useHTML: true,
                                    formatter: function() {
                                        return '<div>' +
                                            '<strong>' + this.key + '</strong><br>' +
                                            'Inscritos: <span class="numero">' + formatarNumero(this.y) + '' +
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
                                        color: '#f04847'
                                    }
                                }
                            },
                            title : {
                                text: ''
                            },
                            series : [{
                                name : 'Inscritos',
                            }],
                            // useHighStocks: true
                        };
                    }
                );

        }


        function getData() {
            var data = moment('2015-06-01');
            var urls = [];
            while (data < moment()) {
                urls.push(avasusService.getUrl('widesus_dashboard', '&data=' + data.endOf('month').format('DD/MM/YYYY')));
                data.add(1, 'months');
            }

            if (data != moment()) {
                urls.push(avasusService.getUrl('widesus_dashboard', '&data=' + moment().format('DD/MM/YYYY')));
            }

            var resultado = urls.map(function(url) {
                return $http.get(url).then(function(res) {
                    return res.data.inscritos;
                });
            });

            return Promise.all(resultado).then(function(resultadoCarregado) {
                console.log(resultadoCarregado);
                var diferencas = resultadoCarregado.slice(1).map(function(res, i) {
                    return res - resultadoCarregado[i];
                });

                var final = [];
                moment.locale('pt-br');
                var data = moment('2015-07-01');
                var i = 0;
                while (data < moment()) {
                    final.push([data.format('MMM/YYYY'), diferencas[i]]);
                    data.add(1, 'months');
                    i++;
                }

                vm.config.series[0].data = final;

                vm.carregando = false;
            });
        }

        function formatarNumero(numero) {
            return Highcharts.numberFormat(numero, 0, ',', '.');
        }
    }
})();
