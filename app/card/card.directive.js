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
                filtro: '@',
                titulo: '@',
                dados: '=',
                erro: '=',
                visualizar: '&',
                status: '=',
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

    Controller.$inject = ['$scope']

    /* @ngInject */
    function Controller($scope) {
        let vm = this

        activate()

        function activate() {
            console.log(vm.status);
            $scope.$watch('vm.filtro', () => {
                if (vm.filtro) {
                    let filtro = JSON.parse(vm.filtro)
                    vm.subtitulo = `${filtro.campo} - ${filtro.descricao || filtro.valor}`
                }
            })
        }
    }
})();
