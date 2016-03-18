(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .controller('FiltroCtrl', FiltroCtrl);

    FiltroCtrl.$inject = ['$ionicPopup', '$state', '$scope', '$ionicModal'];

    /* @ngInject */
    function FiltroCtrl($ionicPopup, $state, $scope, $ionicModal) {
        var vm = this;

        activate();

        $ionicModal.fromTemplateUrl("js/app/filtro-estado/filtro-estado.modal.html", {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.fecharPerfil = function () {
            $scope.modal.hide();
        };

        $scope.visualizarPerfil = function () {
            $scope.modal.show();
        };

        $scope.alterarAvatar = function () {
            $state.go("app.avatares");
            $scope.modal.hide();
        };

        vm.enviar = function(contato) {
            if (!contato ||
                    !contato.nome || contato.nome.trim() === "" ||
                    !contato.email || contato.email.trim() === "" ||
                    !contato.mensagem || contato.mensagem.trim() === "") {

                $ionicPopup.alert({ title: "Por favor, preencha todos os campos." });
            } else {
                $ionicPopup.alert({ title: "Sua mensagem foi enviada com sucesso!" });
                $state.go("app.dash");
            }
        };

        function activate() {

        }
    }
})();
