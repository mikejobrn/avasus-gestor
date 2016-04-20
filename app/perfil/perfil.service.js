(() => {
    angular
        .module('AvasusGestor')
        .factory('perfilService', perfilService)

    perfilService.$inject = ['avasusService', '$http']

    /* @ngInject */
    function perfilService(avasusService, $http) {
        let service = {
            getPerfis,
            ordenarPorNome,
        }

        return service

        function getPerfis() {
            let url = avasusService.getUrl('widesus_dashboard_perfis')
            return $http.get(url).then(resultado => resultado.data)
        }

        function ordenarPorNome(perfis) {
            return perfis.sort((a, b) => a.nome.localeCompare(b.nome))
        }
    }
})();
