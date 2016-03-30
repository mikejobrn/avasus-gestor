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

        function getUrl(funcao, filtros) {
            let url = constantes.API_URL +
                      `/${constantes.API_SERVICO}` +
                      `?wstoken=${constantes.API_TOKEN}` +
                      `&wsfunction=${funcao}` +
                      `&moodlewsrestformat=json`

            if (filtros) {
                filtros.forEach((filtro) => {
                    url += `&${filtro.campo}=${filtro.valor}`
                })
            }

            return url
        }
    }
})();
