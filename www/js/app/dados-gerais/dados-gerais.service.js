(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .factory('dadosGeraisService', dadosGeraisService);

    dadosGeraisService.$inject = ['$http', 'avasusService'];

    /* @ngInject */
    function dadosGeraisService($http, avasusService) {
        var service = {
                get: getDetalhes
            };

        return service;

        ///////////////

        function getDetalhes(filtro) {
            var url = avasusService.getUrl('widesus_dashboard');

            if (filtro && filtro.valor) {
                url += '&' + filtro.campo + '=' + filtro.valor;
            }

            return $http.get(url).then(
                function (cardapio) {
                    return cardapio.data;
                }
            );
        }
    }
})();
