(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .controller('ContatoCtrl', ContatoCtrl);

    ContatoCtrl.$inject = ['$ionicPopup', '$window', '$state'];

    /* @ngInject */
    function ContatoCtrl($ionicPopup, $state) {
        var vm = this;

        activate();

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
