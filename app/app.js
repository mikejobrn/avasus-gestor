(() => {
    angular
        .module('AvasusGestor')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$ionicModal', '$ionicPopup', '$scope', '$state',
      '$ionicHistory', 'perfilService', 'cursoService',
      'localStorageService', '$http', 'filtroService'];

    /* @ngInject */
    function AppCtrl($ionicModal, $ionicPopup, $scope, $state,
        $ionicHistory, perfilService, cursoService,
        localStorageService, $http, filtroService) {

        activate()

        //////

        function activate() {
            // localStorageService.clear()

            $scope.filtrarPorEstado = filtrarPorEstado
            $scope.filtrarPorPerfil = filtrarPorPerfil
            $scope.filtrarPorCurso = filtrarPorCurso
            $scope.removerFiltro = removerFiltro

            $scope.voltarParaDashboard = voltarParaDashboard
            $scope.atualizarDados = atualizarDados

            criarModal('FiltroDados',   'js/templates/filtros/filtro.modal.html')

            criarModal('FiltroEstado',  'js/templates/filtros/filtro-estado.modal.html')

            criarModal('FiltroPerfil',  'js/templates/filtros/filtro-perfil.modal.html')
            carregarListaPerfis()

            criarModal('FiltroCurso',   'js/templates/filtros/filtro-curso.modal.html')
            carregarListaCursos()
        }

        function filtrarPorEstado (estado) {
            $scope.modalFiltroEstado.hide()
            setFiltro({ campo: 'estado', valor: estado })
        }

        function filtrarPorPerfil (perfil) {
            $scope.modalFiltroPerfil.hide()
            setFiltro({ campo: 'perfil', valor: perfil.id, descricao: perfil.nome })
        }

        function filtrarPorCurso (curso) {
            $scope.modalFiltroCurso.hide()
            setFiltro({ campo: 'cursos', valor: curso.cursoid, descricao: curso.curso })
        }

        function removerFiltro () {
            setFiltro()
        }

        function setFiltro (filtro) {
            angular.forEach($http.pendingRequests, request => {
                $http.abort(request)
            })
            filtroService.set(filtro)
            voltarParaDashboard()
        }

        function voltarParaDashboard () {
            $ionicHistory.nextViewOptions({
                disableBack: true
            })
            $scope.modalFiltroDados.hide()
            $state.go('app.dash')
        }

        function atualizarDados (filtro) {
            if (filtro) {
                filtroService.set(filtro)
            }
        }

        function criarModal (nome, caminhoTemplate) {
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

        function carregarListaPerfis () {
            $scope.perfis = ''
            $scope.perfisErro = ''
            perfilService
                .getPerfis()
                .then(
                    perfis => {
                        $scope.perfis = perfilService.ordenarPorNome(perfis)
                    },
                    () => {
                        $scope.perfisErro = 'Não foi possível obter lista de perfis.'
                    }
                )
        }

        function carregarListaCursos () {
            $scope.cursos = ''
            $scope.cursosErro = ''
            cursoService
                .getCursos()
                .then(
                    cursos => {
                        $scope.cursos = cursoService.ordenarPorNome(cursos);
                    },
                    () => {
                        $scope.cursosErro = 'Não foi possível obter lista de cursos.';
                    }
                )
        }

    }
})();
