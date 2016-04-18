(() => {
    angular
        .module('AvasusGestor')
        .controller('DashCtrl', DashCtrl)

    DashCtrl.$inject = ['$scope', 'localStorageService', 'ultimaAtualizacaoService', 'filtroService']

    /* @ngInject */
    function DashCtrl($scope, localStorageService, ultimaAtualizacaoService, filtroService) {
        let vm = this

        activate()

        function activate() {
            vm.visualizarDadosGerais = () => {
                let filtro = filtroService.get()
                return !filtro || filtro.campo === 'estado' || filtro.campo === 'cursos'
            }

            vm.visualizarGraficoInscricoesMes = () => {
                let filtro = filtroService.get()
                return !filtro || (
                    filtro.campo !== 'perfil' &&
                    filtro.campo !== 'cursos'
                )
            }

            vm.visualizarGraficoCursos = () => {
                let filtro = filtroService.get()
                return !filtro || filtro.campo !== 'cursos'
            }

            vm.visualizarMapaCursos = () => {
                let filtro = filtroService.get()
                return !filtro || (
                    filtro.campo !== 'estado' &&
                    filtro.campo !== 'perfil' &&
                    filtro.campo !== 'cursos'
                )
            }
        }

        vm.atualizarDash = () => {
            $scope.atualizacao++
            $scope.dataAtualizacao = ultimaAtualizacaoService.get()
            localStorageService.clear()
            $scope.$broadcast('scroll.refreshComplete')
        }
    }
})();
