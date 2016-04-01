(() => {
    angular
        .module('AvasusGestor')
        .directive('agDadosGerais', agDadosGerais)

    /* @ngInject */
    function agDadosGerais() {
        let directive = {
            restrict: 'EA',
            templateUrl: 'js/app/dados-gerais/dados-gerais.html',
            scope: {
                filtro: '=',
                atualizacao: '='
            },
            link: linkFunc,
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true
        }

        return directive

        function linkFunc(scope, el, attr, ctrl) {
            scope.$watch('vm.atualizacao', () => {
                ctrl.activate()
            })
        }
    }

    Controller.$inject = ['dadosGeraisService', 'cursoService', '$scope', '$timeout']

    /* @ngInject */
    function Controller(dadosGeraisService, cursoService, $scope, $timeout) {
        let vm = this;

        vm.carregando = true

        vm.activate = function() {
            vm.carregando = true
            vm.subtitulo = ''
            if (vm.filtro) {
                vm.subtitulo = vm.filtro.descricao || vm.filtro.valor
            }
            if (vm.filtro && vm.filtro.campo === 'cursos') {
                vm.erro = ''
                cursoService.getCursos(vm.filtro).then(
                    resultado => {
                        let dadosGerais = {
                            usuarios: resultado[0].inscritos,
                            cursos: 1,
                            certificados: resultado[0].certificados
                        }
                        vm.dadosGerais = dadosGerais
                        $timeout(() => {
                            vm.carregando = false
                        })
                    }
                )
            } else {
                dadosGeraisService.get(vm.filtro).then(
                    resultado => {
                        vm.dadosGerais = resultado
                        vm.erro = ''
                        $timeout(() => {
                            vm.carregando = false
                        })
                    },
                    erro => {
                        if (erro.config.timeout && erro.config.timeout.$$state.processScheduled == null) {
                            vm.erro = erro
                            vm.carregando = false
                        }
                    }
                );
            }

        };
    }
})();
