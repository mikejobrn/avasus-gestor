(() => {
    angular
        .module('AvasusGestor')
        .factory('ultimaAtualizacaoService', ultimaAtualizacaoService)

    ultimaAtualizacaoService.$inject = ['Moment']

    /* @ngInject */
    function ultimaAtualizacaoService(Moment) {
        let service = {
            get,
        }

        let ultimaAtualizacaoGeral = Moment()

        return service

        function get(filtro) {
            if (filtro) {
                ultimaAtualizacaoGeral = Moment()
            }

            return ultimaAtualizacaoGeral
        }
    }
})();
