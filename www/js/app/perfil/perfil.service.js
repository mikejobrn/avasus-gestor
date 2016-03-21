(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .factory('perfilService', perfilService);

    perfilService.$inject = ['avasusService', '$http'];

    /* @ngInject */
    function perfilService(avasusService, $http) {
        var service = {
            getPerfis: getPerfis,
            ordenarPorNome: ordenarPorNome
        };

        return service;

        function getPerfis() {
            var url = avasusService.getUrl('widesus_dashboard_perfis');

            return $http.get(url).then(
                function (resultado) {
                    return resultado.data;
                }
            );
        }

        function ordenarPorNome(perfis) {
            return perfis.sort(function(a, b) {
                return a.nome.localeCompare(b.nome);
            });
        }
    }
})();
