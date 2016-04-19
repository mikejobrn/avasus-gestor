(() => {
    angular
        .module('AvasusGestor')
        .controller('DashCtrl', DashCtrl)

    DashCtrl.$inject = ['$scope', 'filtroService', 'ultimaAtualizacaoService']

    /* @ngInject */
    function DashCtrl($scope, filtroService, ultimaAtualizacaoService) {
        let vm = this

        activate()

        function activate() {
            vm.filtro = filtroService.get()
            vm.dataAtualizacao = ultimaAtualizacaoService.get()
        }

        vm.atualizarDash = () => {
            $scope.atualizarDados()
            $scope.$broadcast('scroll.refreshComplete')
        }
    }
})();
