(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$ionicModal', '$scope'];

    /* @ngInject */
    function AppCtrl($ionicModal, $scope) {
        var vm = this;

        activate();

        function activate() {
            $scope.atualizacao = 0;
            criarModal('FiltroDados', 'js/app/filtro/filtro.modal.html');
            criarModal('FiltroEstado', 'js/app/filtro-estado/filtro-estado.modal.html');
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
    }
})();
