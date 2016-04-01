(() => {
    angular
        .module('AvasusGestor')
        .factory('ultimaAtualizacaoService', ultimaAtualizacaoService)

    ultimaAtualizacaoService.$inject = []

    /* @ngInject */
    /*global moment */
    function ultimaAtualizacaoService() {
        let service = {
            get,
        }

        let ultimaAtualizacaoGeral = moment()

        return service

        function get(filtro) {
            if (filtro) {
                ultimaAtualizacaoGeral = moment()
            }

            return ultimaAtualizacaoGeral
        }
    }
})();
