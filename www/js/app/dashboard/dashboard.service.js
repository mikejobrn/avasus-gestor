(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .factory("avasusService", avasusService);

    avasusService.$inject = ['$http', "constantes"];

    function avasusService($http, constantes) {
        var service = {
                getUrl: getUrl
            };

        return service;

        function getUrl (funcao) {
            var url = constantes.API_URL +
                      constantes.API_SERVICO +
                      "?wstoken=" + constantes.API_TOKEN +
                      "&wsfunction=" + funcao +
                      "&moodlewsrestformat=json";

            return url;
        }
    }
})();
