(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$ionicModal', '$scope', 'avasusService', '$http', 'cursoService'];

    /* @ngInject */
    function AppCtrl($ionicModal, $scope, avasusService, $http, cursoService) {
        var vm = this;

        activate();

        function activate() {
            $scope.atualizacao = 0;
            criarModal('FiltroDados', 'js/app/filtro/filtro.modal.html');
            criarModal('FiltroEstado', 'js/app/filtro-estado/filtro-estado.modal.html');
            criarModal('FiltroPerfil', 'js/app/filtro-perfil/filtro-perfil.modal.html');
            criarModal('FiltroCurso', 'js/app/filtro-curso/filtro-curso.modal.html');

            var urlPerfis = avasusService.getUrl('widesus_dashboard_perfis');
            $http.get(urlPerfis).then(
                function (resultado) {
                    var perfisOrdenados = resultado.data.sort(function(a, b) {
                        return a.nome.localeCompare(b.nome);
                    });
                    $scope.perfis = perfisOrdenados;
                },
                function(erro) {
                    console.log("Erro:");
                    console.log(erro);
                }
            );

            var urlCursos = avasusService.getUrl('widesus_dashboard_perfis');
            $http.get(urlCursos).then(
                function (resultado) {
                    var perfisOrdenados = resultado.data.sort(function(a, b) {
                        return a.nome.localeCompare(b.nome);
                    });
                    $scope.perfis = perfisOrdenados;
                },
                function(erro) {
                    console.log("Erro:");
                    console.log(erro);
                }
            );

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

        vm.filtrarPorEstado = function(estado) {
            $scope.modalFiltroEstado.hide();
            $scope.modalFiltroDados.hide();
            $scope.filtro = { campo: 'estado', valor: estado };
        };

        vm.filtrarPorPerfil = function(perfil) {
            $scope.modalFiltroPerfil.hide();
            $scope.modalFiltroDados.hide();
            $scope.filtro = { campo: 'perfil', valor: perfil.id, descricao: perfil.nome };
        };

        vm.filtrarPorCurso = function(curso) {
            $scope.modalFiltroCurso.hide();
            $scope.modalFiltroDados.hide();
            $scope.filtro = { campo: 'curso', valor: curso.cursoid, descricao: curso.curso };
        };
    }
})();
