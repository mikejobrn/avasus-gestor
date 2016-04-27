(() => {
    angular
        .module('AvasusGestor')
        .directive('agCard', agCard)

    /* @ngInject */
    function agCard() {
        let directive = {
            restrict: 'EA',
            templateUrl: 'js/templates/card/card.html',
            scope: {
                filtro: '=',
                titulo: '@',
                subtitulo: '=',
                dados: '=',
                erro: '=',
                visualizar: '&',
            },
            link: linkFunc,
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true,
            transclude: true,
        }

        return directive

        function linkFunc(scope, el, attr, ctrl, transclude) {

        }
    }

    Controller.$inject = []

    /* @ngInject */
    function Controller() {
        let vm = this

        vm.dados = ''
        vm.erro = ''

        activate()

        function activate() {

        }
    }
})();
