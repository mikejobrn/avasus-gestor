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
                filtro: '='
            },
            // scope: true,
            link: linkFunc,
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            // scope.filtro = attr.filtro;
            scope.$watch('vm.filtro', function (a) {
                ctrl.carregando = true;
                ctrl.activate();
                console.log('Filtro changed');
            });
        }
    }

    Controller.$inject = ['dadosGeraisService'];

    /* @ngInject */
    function Controller(dadosGeraisService) {
        var vm = this;

        vm.carregando = true;

        vm.activate = function() {
            console.log('Directive activated');
            dadosGeraisService.get({ campo: 'estado', valor: vm.filtro }).then(
                function (sucesso) {
                    vm.dadosGerais = sucesso;
                    vm.carregando = false;
                },
                function (erro) {
                    console.log(erro);
                }
            );
        };

        vm.activate();
    }
})();
