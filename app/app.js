(() => {
    angular
        .module('AvasusGestor')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$ionicModal', '$ionicPopup', '$scope', '$state',
      '$ionicHistory', '$window', 'perfilService', 'cursoService',
      'localStorageService', '$http', 'filtroService'];

    /* @ngInject */
    function AppCtrl($ionicModal, $ionicPopup, $scope, $state,
        $ionicHistory, $window, perfilService, cursoService,
        localStorageService, $http, filtroService) {

        activate()

        //////

        function activate() {
            localStorageService.clear()

            $scope.filtrarPorEstado = filtrarPorEstado
            $scope.filtrarPorPerfil = filtrarPorPerfil
            $scope.filtrarPorCurso = filtrarPorCurso
            $scope.getFiltro = getFiltro
            $scope.removerFiltro = removerFiltro


            $scope.voltarParaDashboard = voltarParaDashboard
            $scope.atualizarDados = atualizarDados
            $scope.avaliar = avaliar
            $scope.acessarAva = acessarAva
            $scope.enviarContato = enviarContato

            criarModal('FiltroDados',   'js/templates/filtros/filtro.modal.html')

            criarModal('FiltroEstado',  'js/templates/filtros/filtro-estado.modal.html')

            criarModal('FiltroPerfil',  'js/templates/filtros/filtro-perfil.modal.html')
            carregarListaPerfis()

            criarModal('FiltroCurso',   'js/templates/filtros/filtro-curso.modal.html')
            carregarListaCursos()

            criarModal('Contato',       'js/templates/contato/contato.modal.html')
            criarModal('Creditos',      'js/templates/creditos/creditos.modal.html')
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
            setFiltro({ campo: 'curso', valor: curso.cursoid, descricao: curso.curso })
        }

        function getFiltro () {
            return filtroService.get()
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

        function avaliar() {
            $window.open('market://details?id=br.ufrn.huol.lais.transparenciaavasus', '_system')
        }

        function acessarAva() {
            $window.open('https://avasus.ufrn.br/', '_blank',
                'location=no,zoom=yes,clearcache=yes,clearsessioncache=yes')
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
                        $scope.cursos = cursoService.ordenarPorNome(cursos)
                    },
                    () => {
                        $scope.cursosErro = 'Não foi possível obter lista de cursos.'
                    }
                )
        }

        function enviarContato(contato) {
            if (!contato ||
                    !contato.nome || contato.nome.trim() === '' ||
                    !contato.email || contato.email.trim() === '' ||
                    !contato.mensagem || contato.mensagem.trim() === '') {

                $ionicPopup.alert({ title: 'Por favor, preencha todos os campos.' })
            } else {
                enviarEmail(contato)
                $scope.fecharModalContato()
            }
        }

        function enviarEmail(contato) {
            let email = 'suporte.sedis@gmail.com',
                subject = 'Transparência AVASUS',
                body = `Nome: ${contato.nome}\n` +
                        `Email: ${contato.email}\n` +
                        `Mensagem: ${contato.mensagem}`

            $window.location.href = `mailto:${email}` +
                `?subject=${encodeURIComponent(subject)}` +
                `&body=${encodeURIComponent(body)}`
        }

    }
})();
