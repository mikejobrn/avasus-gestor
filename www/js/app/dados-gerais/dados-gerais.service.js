(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .factory('dadosGeraisService', dadosGeraisService);

    dadosGeraisService.$inject = ['$http', 'avasusService', 'localStorageService', '$q'];

    /* @ngInject */
    function dadosGeraisService($http, avasusService, localStorageService, $q) {
        var service = {
                get: getDetalhes,
                getPorMes: getPorMes
            };

        return service;

        ///////////////

        function getDetalhes(filtro, atualizar) {
            var url = avasusService.getUrl('widesus_dashboard');

            if (filtro && filtro.valor) {
                url += '&' + filtro.campo + '=' + filtro.valor;
            }

            var dadosGerais = localStorageService.getObject('dados_gerais');
            if (dadosGerais && !atualizar && !filtro) {
                return $q.resolve(dadosGerais);
            }

            return $http.get(url).then(
                function (resultado) {
                    if (!filtro) {
                        localStorageService.setObject('dados_gerais', resultado.data);
                    }
                    return resultado.data;
                }
            );
        }

        function getPorMes(data, filtro, atualizar) {
            var params = '&data=' + data.endOf('month').format('DD/MM/YYYY');
            if (filtro && filtro.campo == 'estado') {
                params += '&estado=' + filtro.valor;
            }
            var url = avasusService.getUrl('widesus_dashboard', params);

            var chave = 'data_' + data.format('YYYY_MM_DD');
            var dadosGeraisMes = localStorageService.getObject(chave);
            if (dadosGeraisMes && !atualizar && !filtro) {
                return $q.resolve(dadosGeraisMes);
            }

            return $http.get(url).then(
                function (resultado) {
                    if (!filtro) {
                        localStorageService.setObject(chave, resultado.data);
                    }
                    return resultado.data;
                }
            );
        }
    }
})();
