(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .factory('dadosGeraisService', dadosGeraisService);

    dadosGeraisService.$inject = ['$http', 'avasusService'];

    /* @ngInject */
    function dadosGeraisService($http, avasusService) {
        var detalhes = {
                usuarios: 0,
                cursos: 0,
                certificados: 0
            },

            service = {
                set: setDetalhes,
                get: getDetalhes
            };

        return service;

        function setDetalhes (novosDetalhes) {
            detalhes.usuarios = novosDetalhes.usuarios;
            detalhes.cursos = novosDetalhes.cursos;
            detalhes.certificados = novosDetalhes.certificados;
        }

        function getDetalhes () {
            var url = avasusService.getUrl('widesus_dashboard');

            return $http.get(url).then(
                function (cardapio) {
                    return cardapio.data;
                }
            );
        }
    }
})();
