(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .factory('cursoService', cursoService);

    cursoService.$inject = ['avasusService', '$http'];

    /* @ngInject */
    function cursoService(avasusService, $http) {
        var service = {
            getResumoPorEstado: getResumoPorEstado
        };

        return service;

        function getResumoPorEstado(estado) {
            var url = avasusService.getUrl('widesus_dashboard', '&estado=' + estado);

            return $http.get(url).then(
                function (resultado) {
                    return resultado.data;
                }
            );
        }
    }
})();
