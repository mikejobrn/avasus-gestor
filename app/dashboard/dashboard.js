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
            $scope.$watch(() => filtroService.get(), () => {
                vm.filtro = filtroService.get()
                console.log(vm.filtro);
            })
            // vm.dataAtualizacao = ultimaAtualizacaoService.get()
        }

        vm.atualizarDash = () => {
            $scope.atualizarDados()
            $scope.$broadcast('scroll.refreshComplete')
        }

        vm.testar = () => true
    }
})();
