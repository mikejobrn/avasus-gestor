(() => {
    angular
        .module('AvasusGestor')
        .directive('agDadosGerais', agDadosGerais)

    agDadosGerais.$inject = ['Eventos']

    /* @ngInject */
    function agDadosGerais(Eventos) {
        let directive = {
            restrict: 'EA',
            templateUrl: 'js/templates/dados-gerais/dados-gerais.html',
            scope: {
            },
            link: linkFunc,
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true
        }

        return directive

        function linkFunc(scope, el, attr, ctrl) {
            scope.$watch('vm.filtro', () => {
                ctrl.activate()
            })

            scope.$on(Eventos.ATUALIZAR_DADOS, () => {
                ctrl.activate()
            })
        }
    }

    Controller.$inject = ['dadosGeraisService', '$scope', 'filtroService']

    /* @ngInject */
    function Controller(dadosGeraisService, $scope, filtroService) {
        let vm = this

        vm.activate = activate
        vm.visualizar = visualizar
        vm.status = {}
        vm.status.visivel = visualizar

        function activate () {
            vm.status.sucesso = false
            vm.status.erro = false

            $scope.$watch(() => filtroService.get(), () => {
                vm.filtro = filtroService.get()
            })

            if (vm.filtro) {
                vm.subtitulo = `${vm.filtro.campo} - ${vm.filtro.descricao || vm.filtro.valor}`
            }

            if (vm.filtro && vm.filtro.campo === 'curso') {
                getPorCursos()
            } else {
                getDadosGerais()
            }
        }

        function getPorCursos() {
            dadosGeraisService.get(vm.filtro).then(
                resultado => {
                    let dados = {
                        usuarios: resultado.inscritos,
                        cursos: 1,
                        certificados: resultado.certificados
                    }

                    vm.dados = dados
                }
            )
        }

        function getDadosGerais () {
            dadosGeraisService.get(vm.filtro).then(
                resultado => {
                    vm.dados = resultado
                    vm.status.sucesso = true
                },
                erro => {
                    if (erro.config.timeout && erro.config.timeout.$$state.processScheduled == null) {
                        vm.status.erro = true
                    }
                }
            )
        }

        function visualizar () {
            return (!vm.filtro || Object.keys(vm.filtro).length === 0) ||
                    (vm.filtro && vm.filtro.campo && (vm.filtro.campo === 'estado' || vm.filtro.campo === 'curso'))
        }
    }
})();
