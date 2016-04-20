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
                filtroString: '@filtro',
            },
            link: linkFunc,
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true
        }

        return directive

        function linkFunc(scope, el, attr, ctrl) {
            scope.$watch('vm.filtroString', () => {
                ctrl.activate()
            })

            scope.$on(Eventos.ATUALIZAR_DADOS, () => {
                ctrl.activate()
            })
        }
    }

    Controller.$inject = ['dadosGeraisService', 'cursoService']

    /* @ngInject */
    function Controller(dadosGeraisService, cursoService) {
        let vm = this

        vm.activate = activate
        vm.visualizar = visualizar

        function activate () {
            vm.dadosGerais = ''
            vm.erro = ''
            if (vm.filtroString !== '') {
                vm.filtro = JSON.parse(vm.filtroString)
            } else {
                vm.filtro = ''
            }

            if (vm.filtro && vm.filtro.campo === 'cursos') {
                getPorCursos()
            } else {
                getDadosGerais()
            }
        }

        function getPorCursos() {
            cursoService.getCursos(vm.filtro).then(
                resultado => {
                    let curso = resultado[0]

                    let dadosGerais = {
                        usuarios: curso.inscritos,
                        cursos: 1,
                        certificados: curso.certificados
                    }

                    vm.dadosGerais = dadosGerais
                }
            )
        }

        function getDadosGerais () {
            dadosGeraisService.get(vm.filtro).then(
                resultado => {
                    vm.dadosGerais = resultado
                },
                erro => {
                    if (erro.config.timeout && erro.config.timeout.$$state.processScheduled == null) {
                        vm.erro = erro
                    }
                }
            )
        }

        function visualizar () {
            return (!vm.filtro || Object.keys(vm.filtro).length === 0) ||
                    (vm.filtro && vm.filtro.campo && (vm.filtro.campo === 'estado' || vm.filtro.campo === 'cursos'))
        }
    }
})();
