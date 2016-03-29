(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$ionicModal', '$ionicPopup', '$scope', '$state', '$ionicHistory', 'perfilService', 'cursoService'];

    /* @ngInject */
    function AppCtrl($ionicModal, $ionicPopup, $scope, $state, $ionicHistory, perfilService, cursoService) {
        var vm = this;

        activate();

        function activate() {
            $scope.atualizacao = 0;

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

        $scope.voltarParaDashboard = function() {
            voltarParaDashboard();
        };

        $scope.filtrarPorEstado = function(estado) {
            $scope.modalFiltroEstado.hide();
            setFiltro({ campo: 'estado', valor: estado });
        };

        $scope.filtrarPorPerfil = function(perfil) {
            $scope.modalFiltroPerfil.hide();
            setFiltro({ campo: 'perfil', valor: perfil.id, descricao: perfil.nome })
        };

        $scope.filtrarPorCurso = function(curso) {
            $scope.modalFiltroCurso.hide();
            setFiltro({ campo: 'cursos', valor: curso.cursoid, descricao: curso.curso })
        };

        $scope.removerFiltro = function() {
            setFiltro();
        };

        function setFiltro(filtro) {
            $scope.filtro = filtro;
            $scope.atualizacao++;
            voltarParaDashboard();
        }
    }
})();
