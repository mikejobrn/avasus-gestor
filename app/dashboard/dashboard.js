(() => {
    angular
        .module('AvasusGestor')
        .controller('DashCtrl', DashCtrl)

    DashCtrl.$inject = ['$scope', 'ultimaAtualizacaoService', 'localStorageService', 'Eventos']

    /* @ngInject */
    function DashCtrl($scope, ultimaAtualizacaoService, localStorageService, Eventos) {
        let vm = this

        activate()

        function activate() {
            vm.dataAtualizacao = ultimaAtualizacaoService.get()
        }

        vm.atualizarDash = () => {
            localStorageService.clear()
            $scope.$broadcast(Eventos.ATUALIZAR_DADOS)
            $scope.$broadcast('scroll.refreshComplete')
        }
    }
})();
