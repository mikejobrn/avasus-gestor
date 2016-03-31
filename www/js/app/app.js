(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$ionicModal', '$ionicPopup', '$scope', '$state',
      '$ionicHistory', 'perfilService', 'cursoService', 'dadosGeraisService', '$http', 'localStorageService'];

    /* @ngInject */
    function AppCtrl($ionicModal, $ionicPopup, $scope, $state,
        $ionicHistory, perfilService, cursoService, dadosGeraisService, $http, localStorageService) {
        var vm = this;

        activate();

        let atualizacaoGeral

        function activate() {
            localStorageService.clear()
            $scope.atualizacao = moment();
            atualizacaoGeral = $scope.atualizacao;

            criarModal('FiltroDados',   'js/app/filtro/filtro.modal.html');

            criarModal('FiltroEstado',  'js/app/filtro-estado/filtro-estado.modal.html');

            criarModal('FiltroPerfil',  'js/app/filtro-perfil/filtro-perfil.modal.html');
            carregarListaPerfis();

            criarModal('FiltroCurso',   'js/app/filtro-curso/filtro-curso.modal.html');
            carregarListaCursos();
        }

        function criarModal(nome, caminhoTemplate) {
            $ionicModal
                .fromTemplateUrl(caminhoTemplate, { scope: $scope })
                .then(function (modal) {
                    $scope['modal' + nome] = modal;
                });

            $scope['abrirModal' + nome] = function () {
                $scope['modal' + nome].show();
            };

            $scope['fecharModal' + nome] = function () {
                $scope['modal' + nome].hide();
            };
        }

        function voltarParaDashboard() {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $scope.modalFiltroDados.hide();
            $state.go('app.dash');
        }

        function carregarListaPerfis() {
            $scope.perfilCarregando = true;
            $scope.perfilErro = '';
            perfilService
                .getPerfis()
                .then(
                    function(perfis) {
                        $scope.perfis = perfilService.ordenarPorNome(perfis);
                    },
                    function() {
                        $scope.perfis = '';
                        $scope.perfilErro = 'Não foi possível obter lista de perfis.';
                    }
                )
                .finally(function() {
                    $scope.perfilCarregando = false;
                });
        }

        function carregarListaCursos() {
            $scope.cursoCarregando = true;
            $scope.cursoErro = '';
            cursoService
                .getCursos()
                .then(
                    function(cursos) {
                        $scope.cursos = cursoService.ordenarPorNome(cursos);
                    },
                    function() {
                        $scope.cursos = '';
                        $scope.cursoErro = 'Não foi possível obter lista de cursos.';
                    }
                )
                .finally(function() {
                    $scope.cursoCarregando = false;
                });
        }

        function setFiltro(filtro) {
            angular.forEach($http.pendingRequests, request => {
              $http.abort(request);
            });
            $scope.filtro = filtro;
            if (filtro) {
                atualizacaoGeral = $scope.atualizacao
                $scope.atualizacao = moment();
            } else {
                $scope.atualizacao = atualizacaoGeral
            }
            voltarParaDashboard();
        }

        $scope.voltarParaDashboard = function() {
            voltarParaDashboard();
        };

        $scope.filtrarPorEstado = function(estado) {
            $scope.modalFiltroEstado.hide();
            setFiltro({ campo: 'estado', valor: estado });
        };

        $scope.filtrarPorPerfil = function(perfil) {
            $scope.modalFiltroPerfil.hide();
            setFiltro({ campo: 'perfil', valor: perfil.id, descricao: perfil.nome });
        };

        $scope.filtrarPorCurso = function(curso) {
            $scope.modalFiltroCurso.hide();
            setFiltro({ campo: 'cursos', valor: curso.cursoid, descricao: curso.curso });
        };

        $scope.removerFiltro = function() {
            setFiltro();
        };

        $scope.visualizarDadosGerais = function() {
            return !$scope.filtro ||
                $scope.filtro.campo === 'estado' ||
                $scope.filtro.campo === 'cursos';
        };

        $scope.visualizarGraficoInscricoesMes = function() {
            return !$scope.filtro || (
                $scope.filtro.campo !== 'perfil' &&
                $scope.filtro.campo !== 'cursos'
            );
        };

        $scope.visualizarGraficoCursos = function() {
            return !$scope.filtro || $scope.filtro.campo !== 'cursos';
        };

        $scope.visualizarMapaCursos = function() {
            return !$scope.filtro || (
                $scope.filtro.campo !== 'estado' &&
                $scope.filtro.campo !== 'perfil' &&
                $scope.filtro.campo !== 'cursos'
            );
        };
    }
})();
