(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$ionicModal', '$scope', '$state', '$ionicHistory', 'perfilService', 'cursoService'];

    /* @ngInject */
    function AppCtrl($ionicModal, $scope, $state, $ionicHistory, perfilService, cursoService) {
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
            $ionicModal.fromTemplateUrl(caminhoTemplate, {
                scope: $scope
            }).then(function (modal) {
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
                }
            );
        }

        function carregarListaCursos() {
            cursoService.getDetalhes().then(
                function(resultado) {
                    console.log(resultado);
                    $scope.cursos = resultado;
                },
                function(erro) {
                    console.log(erro);
                }
            );
        }

        vm.filtrarPorEstado = function(estado) {
            $scope.modalFiltroEstado.hide();
            $scope.filtro = { campo: 'estado', valor: estado };
            voltarParaDashboard();
        };

        vm.filtrarPorPerfil = function(perfil) {
            $scope.modalFiltroPerfil.hide();
            $scope.filtro = { campo: 'perfil', valor: perfil.id, descricao: perfil.nome };
            voltarParaDashboard();
        };

        vm.filtrarPorCurso = function(curso) {
            $scope.modalFiltroCurso.hide();
            $scope.filtro = { campo: 'curso', valor: curso.cursoid, descricao: curso.curso };
            voltarParaDashboard();
        };

        vm.removerFiltro = function() {
            $scope.filtro = null;
        };
    }
})();
