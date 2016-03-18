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
            console.log(attr);
        }
    }

    Controller.$inject = ['dadosGeraisService'];

    /* @ngInject */
    function Controller(dadosGeraisService) {
        var vm = this;

        vm.carregando = true;

        activate();

        function activate() {
            dadosGeraisService.get().then(
                function (sucesso) {
                    vm.dadosGerais = sucesso;
                    vm.carregando = false;
                },
                function (erro) {
                    console.log(erro);
                }
            );
        }
    }
})();
