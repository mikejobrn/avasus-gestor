(() => {
    angular
        .module('AvasusGestor')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$ionicModal', '$ionicPopup', '$scope', '$state',
      '$ionicHistory', 'perfilService', 'cursoService', 'ultimaAtualizacaoService',
      'localStorageService', '$http', 'filtroService'];

    /* @ngInject */
    function AppCtrl($ionicModal, $ionicPopup, $scope, $state,
        $ionicHistory, perfilService, cursoService, ultimaAtualizacaoService,
        localStorageService, $http, filtroService) {

        activate()

        function activate() {
            localStorageService.clear()
            $scope.atualizacao = 0
            $scope.dataAtualizacao = ultimaAtualizacaoService.get()

            criarModal('FiltroDados',   'js/app/filtros/filtro.modal.html')

            criarModal('FiltroEstado',  'js/app/filtros/filtro-estado.modal.html')

            criarModal('FiltroPerfil',  'js/app/filtros/filtro-perfil.modal.html')
            carregarListaPerfis()

            criarModal('FiltroCurso',   'js/app/filtros/filtro-curso.modal.html')
            carregarListaCursos()
        }

        function criarModal(nome, caminhoTemplate) {
            $ionicModal
                .fromTemplateUrl(caminhoTemplate, { scope: $scope })
                .then(modal => {
                    $scope['modal' + nome] = modal
                })

            $scope['abrirModal' + nome] = () => {
                $scope['modal' + nome].show()
            }

            $scope['fecharModal' + nome] = () => {
                $scope['modal' + nome].hide()
            }
        }

        function voltarParaDashboard() {
            $ionicHistory.nextViewOptions({
                disableBack: true
            })
            $scope.modalFiltroDados.hide()
            $state.go('app.dash')
        }

        function carregarListaPerfis() {
            $scope.perfilCarregando = true
            $scope.perfilErro = ''
            perfilService
                .getPerfis()
                .then(
                    perfis => {
                        $scope.perfis = perfilService.ordenarPorNome(perfis)
                    },
                    () => {
                        $scope.perfis = ''
                        $scope.perfilErro = 'Não foi possível obter lista de perfis.'
                    }
                )
                .finally(() => {
                    $scope.perfilCarregando = false
                })
        }

        function carregarListaCursos() {
            $scope.cursoCarregando = true
            $scope.cursoErro = ''
            cursoService
                .getCursos()
                .then(
                    cursos => {
                        $scope.cursos = cursoService.ordenarPorNome(cursos);
                    },
                    () => {
                        $scope.cursos = '';
                        $scope.cursoErro = 'Não foi possível obter lista de cursos.';
                    }
                )
                .finally(() => {
                    $scope.cursoCarregando = false;
                })
        }

        function setFiltro(filtro) {
            angular.forEach($http.pendingRequests, request => {
                $http.abort(request)
            })
            filtroService.set(filtro)
            $scope.$broadcast('publico.atualizarFiltro', filtro)
            $scope.dataAtualizacao = ultimaAtualizacaoService.get(filtro)
            voltarParaDashboard()
        }

        $scope.voltarParaDashboard = () => {
            voltarParaDashboard()
        }

        $scope.filtrarPorEstado = estado => {
            $scope.modalFiltroEstado.hide()
            setFiltro({ campo: 'estado', valor: estado })
        }

        $scope.filtrarPorPerfil = perfil => {
            $scope.modalFiltroPerfil.hide()
            setFiltro({ campo: 'perfil', valor: perfil.id, descricao: perfil.nome })
        }

        $scope.filtrarPorCurso = curso => {
            $scope.modalFiltroCurso.hide()
            setFiltro({ campo: 'cursos', valor: curso.cursoid, descricao: curso.curso })
        }

        $scope.removerFiltro = () => {
            setFiltro()
        }
    }
})();
