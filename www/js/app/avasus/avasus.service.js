(() => {
    angular
        .module('AvasusGestor')
        .factory('avasusService', avasusService)

    avasusService.$inject = ['avasusConstantes']

    /* @ngInject */
    function avasusService(avasusConstantes) {
        let service = {
                getUrl,
            }

        return service

        //////////////

        function getUrl(funcao, filtros) {
            let url = avasusConstantes.API_URL +
                      `/${avasusConstantes.API_SERVICO}` +
                      `?wstoken=${avasusConstantes.API_TOKEN}` +
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
