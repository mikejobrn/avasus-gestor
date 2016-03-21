(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .controller('ContatoCtrl', ContatoCtrl);

    ContatoCtrl.$inject = ['$ionicPopup', '$window', '$scope'];

    /* @ngInject */
    function ContatoCtrl($ionicPopup, $window, $scope) {
        var vm = this;

        activate();

        function activate() {

        }

        vm.enviar = function(contato) {
            if (!contato ||
                    !contato.nome || contato.nome.trim() === "" ||
                    !contato.email || contato.email.trim() === "" ||
                    !contato.mensagem || contato.mensagem.trim() === "") {

                $ionicPopup.alert({ title: "Por favor, preencha todos os campos." });
            } else {
                enviarEmail(contato);
                // $ionicPopup.alert({ title: "Sua mensagem foi enviada com sucesso!" });
                $scope.voltarParaDashboard();
            }
        };

        function enviarEmail(contato) {
            var email = 'moodle@sedis.ufrn.br',
                subject = 'AVASUS - Gestor',
                body = 'Nome: ' + contato.nome + '\n' +
                  'Email: ' + contato.email + '\n' +
                  'Mensagem: ' + contato.mensagem;
            $window.location.href = 'mailto:' + email +
                '?subject=' + encodeURIComponent(subject) +
                '&body=' + encodeURIComponent(body);
        }
    }
})();
