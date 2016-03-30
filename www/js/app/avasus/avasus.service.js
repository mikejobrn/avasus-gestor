(() => {
    angular
        .module('AvasusGestor')
        .factory('avasusService', avasusService)

    avasusService.$inject = ['constantes']

    /* @ngInject */
    function avasusService(constantes) {
        let service = {
                getUrl,
            }

        return service

        //////////////

        function getUrl(funcao, filtro) {
            let url = constantes.API_URL +
                      `/${constantes.API_SERVICO}` +
                      `?wstoken=${constantes.API_TOKEN}` +
                      `&wsfunction=${funcao}` +
                      `&moodlewsrestformat=json`

            if (filtro) {
                url += filtro
            }

            return url
        }
    }
})();
