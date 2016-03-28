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

    Controller.$inject = ['dadosGeraisService'];

    /* @ngInject */
    function Controller(dadosGeraisService) {
        var vm = this;

        vm.carregando = true;

        vm.activate = function() {
            vm.carregando = true;
            dadosGeraisService.get(vm.filtro).then(
                function(resultado) {
                    vm.dadosGerais = resultado;
                    vm.carregando = false;
                },
                function(erro) {
                    vm.erro = erro;
                    vm.carregando = false;
                }
            );
        };
    }
})();
