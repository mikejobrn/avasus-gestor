(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .factory('cursoService', cursoService);

    cursoService.$inject = ['avasusService', '$http'];

    /* @ngInject */
    function cursoService(avasusService, $http) {
        var service = {
            getDetalhes: getDetalhes,
            getResumoPorEstado: getResumoPorEstado
        };

        return service;

        function getDetalhes(filtro) {
            var url = avasusService.getUrl('widesus_dashboard_curso');

            if (filtro && filtro.valor) {
                url += '&' + filtro.campo + '=' + filtro.valor;
            }

            console.log(url);

            return $http.get(url).then(
                function (resultado) {
                    return resultado.data;
                }
            );
        }

        function getResumoPorEstado(estado, filtro) {
            var url = avasusService.getUrl('widesus_dashboard', '&estado=' + estado);

            if (filtro && filtro.valor && filtro.campo != 'estado') {
                url += '&' + filtro.campo + '=' + filtro.valor;
            }

            console.log(url);

            return $http.get(url).then(
                function (resultado) {
                    return resultado.data;
                }
            );
        }
    }
})();
