(() => {
    angular
        .module('AvasusGestor')
        .controller('ContatoCtrl', ContatoCtrl)

    ContatoCtrl.$inject = ['$ionicPopup', '$window', '$scope']

    /* @ngInject */
    function ContatoCtrl($ionicPopup, $window, $scope) {
        let vm = this

        activate()

        function activate() {

        }

        vm.enviar = function(contato) {
            if (!contato ||
                    !contato.nome || contato.nome.trim() === '' ||
                    !contato.email || contato.email.trim() === '' ||
                    !contato.mensagem || contato.mensagem.trim() === '') {

                $ionicPopup.alert({ title: 'Por favor, preencha todos os campos.' })
            } else {
                enviarEmail(contato)
                $scope.voltarParaDashboard()
            }
        };

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
