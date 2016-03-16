(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .factory("avasusService", avasusService);

    avasusService.$inject = ['$http', "constantes"];

    function avasusService($http, constantes) {
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
            var url = constantes.API_URL +
                      constantes.API_SERVICO +
                      "?wstoken=" + constantes.API_TOKEN +
                      "&wsfunction=widesus_dashboard" +
                      "&moodlewsrestformat=json";

            return $http.get(url).then(
                function (cardapio) {
                    return cardapio.data;
                }
            );
        }
    }
})();
