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
                      `?function=${funcao}`

            let urlFiltros = ''
            if (filtros) {
                if (filtros.length) {
                    filtros.forEach(filtro => {
                        if (Object.keys(filtro).length) {
                            urlFiltros += `%26${filtro.campo}%3D${filtro.valor}`
                        }
                    })
                } else {
                    urlFiltros += `%26${filtros.campo}%3D${filtros.valor}`
                }

                url += `&filtro=${urlFiltros}`
            }

            return url
        }
    }
})();
