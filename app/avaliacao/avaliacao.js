(() => {
    angular
        .module('AvasusGestor')
        .controller('AvaliacaoCtrl', AvaliacaoCtrl)

    AvaliacaoCtrl.$inject = ['$ionicPopup', '$state']

    /* @ngInject */
    function AvaliacaoCtrl($ionicPopup, $state) {
        var vm = this;

        activate()

        function activate() {

        }

        vm.enviar = function(avaliacao) {
            if (!avaliacao ||
                !avaliacao.comentarios ||
                avaliacao.comentarios.trim() === ''
            ) {
                $ionicPopup.alert({ title: 'Por favor, preencha todos os campos.' })
            } else {
                $ionicPopup.alert({ title: 'Sua avaliação foi enviada com sucesso!' })
                $state.go('app.dash')
            }
        };
    }
})();
