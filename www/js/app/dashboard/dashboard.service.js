(function() {
/*global angular */
angular
    .module('AvasusGestor')
    .constant("constantes", {
        API_URL: "https://ufrn.unasus.gov.br",
        API_SERVICO: "/moodle26/webservice/rest/server.php"
    })
    .factory("avasusService", avasusService);

avasusService.$inject = ['$http', "constantes"];

function avasusService($http, constantes) {
    "use strict";

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

        // $localStorage.setObject("saldo", saldo);
    }

    function getDetalhes () {
        var url = constantes.API_URL +
                    constantes.API_SERVICO + "?wstoken=7661cf1a8c2e7024093444aa0147083d&wsfunction=widesus_dashboard&moodlewsrestformat=json";

            return $http.get(url).then(
                function (cardapio) {
                    return cardapio.data;
                }
            );

    }
}
})();
