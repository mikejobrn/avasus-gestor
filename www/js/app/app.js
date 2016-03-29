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

            // vm.filtrarPorCurso({ cursoid: 12, curso: 'AVASUS'});
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
            perfilService.getPerfis().then(
                function(resultado) {
                    $scope.perfis = perfilService.ordenarPorNome(resultado);
                },
                function() {
                    $scope.perfis = '';
                    $ionicPopup.alert({ title: 'Não foi possível obter a lista de perfis.' });
                }
            );
        }

        function carregarListaCursos() {
            cursoService.getCursos().then(
                function(resultado) {
                    $scope.cursos = cursoService.ordenarPorNome(resultado);
                },
                function(erro) {
                    $scope.cursos = '';
                    $ionicPopup.alert({ title: 'Não foi possível obter a lista de cursos.' });
                }
            );
        }

        $scope.voltarParaDashboard = function() {
            voltarParaDashboard();
        };

        vm.filtrarPorEstado = function(estado) {
            $scope.modalFiltroEstado.hide();
            $scope.filtro = { campo: 'estado', valor: estado };
            $scope.atualizacao++;
            voltarParaDashboard();
        };

        vm.filtrarPorPerfil = function(perfil) {
            $scope.modalFiltroPerfil.hide();
            $scope.filtro = { campo: 'perfil', valor: perfil.id, descricao: perfil.nome };
            $scope.atualizacao++;
            voltarParaDashboard();
        };

        vm.filtrarPorCurso = function(curso) {
            $scope.modalFiltroCurso.hide();
            $scope.filtro = { campo: 'cursos', valor: curso.cursoid, descricao: curso.curso };
            $scope.atualizacao++;
            voltarParaDashboard();
        };

        vm.removerFiltro = function() {
            $scope.filtro = null;
            $scope.atualizacao++;
        };
    }
})();
