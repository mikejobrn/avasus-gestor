(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .directive('agDadosGerais', agDadosGerais);

    /* @ngInject */
    function agDadosGerais() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'js/app/dados-gerais/dados-gerais.html',
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

    Controller.$inject = ['dadosGeraisService', 'cursoService', '$scope', '$timeout'];

    /* @ngInject */
    function Controller(dadosGeraisService, cursoService, $scope, $timeout) {
        var vm = this;

        vm.carregando = true;

        vm.activate = function() {
            vm.carregando = true;
            vm.subtitulo = '';
            if (vm.filtro) {
                vm.subtitulo = vm.filtro.descricao || vm.filtro.valor;
            }
            if (vm.filtro && vm.filtro.campo === 'cursos') {
                vm.erro = '';
                cursoService.getCursos(vm.filtro).then(
                    function(res) {
                        var dadosGerais = {
                            usuarios: res[0].inscritos,
                            cursos: 1,
                            certificados: res[0].certificados
                        };
                        vm.dadosGerais = dadosGerais;
                        $timeout(function() {
                          vm.carregando = false;
                        });
                    }
                );
            } else {
                dadosGeraisService.get(vm.filtro).then(
                    function(resultado) {
                        vm.dadosGerais = resultado;
                        vm.erro = '';
                        $timeout(function() {
                          vm.carregando = false;
                        });
                    },
                    function(erro) {
                        vm.erro = erro;
                        $timeout(function() {
                          vm.carregando = false;
                        });
                    }
                );
            }

        };
    }
})();
