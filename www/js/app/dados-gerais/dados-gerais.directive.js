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
            },
            link: linkFunc,
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {

        }
    }

    Controller.$inject = ['dadosGeraisService'];

    /* @ngInject */
    function Controller(dadosGeraisService) {
        var vm = this;

        activate();

        function activate() {
            dadosGeraisService.get().then(
                function (sucesso) {
                    vm.dadosGerais = sucesso;
                },
                function (erro) {
                    console.log(erro);
                }
            );
        }
    }
})();
