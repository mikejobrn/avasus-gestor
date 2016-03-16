(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .constant("constantes", {
            API_URL: "https://ufrn.unasus.gov.br",
            API_SERVICO: "/moodle26/webservice/rest/server.php",
            API_TOKEN: "7661cf1a8c2e7024093444aa0147083d"
        });
})();
