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

    Controller.$inject = ['dadosGeraisService', 'cursoService', '$scope'];

    /* @ngInject */
    function Controller(dadosGeraisService, cursoService, $scope) {
        var vm = this;

        vm.carregando = true;

        vm.activate = function() {
            vm.carregando = true;
            if (vm.filtro && vm.filtro.campo == 'cursos') {
                cursoService.getDetalhes(vm.filtro).then(
                    function(res) {
                        var dadosGerais = {
                            usuarios: res[0].inscritos,
                            cursos: 1,
                            certificados: res[0].certificados
                        }
                        vm.dadosGerais = dadosGerais;
                        vm.subtitulo = vm.filtro.descricao;
                        vm.erro = '';
                        vm.carregando = false;
                    }
                );
            } else {
                dadosGeraisService.get(vm.filtro).then(
                    function(resultado) {
                        vm.dadosGerais = resultado;
                        if (vm.filtro) {
                            vm.subtitulo = vm.filtro.valor;
                        }
                        vm.erro = '';
                        vm.carregando = false;
                    },
                    function(erro) {
                        vm.erro = erro;
                        vm.carregando = false;
                    }
                );
            }

        };
    }
})();
