(() => {
    angular
        .module('AvasusGestor')
        .factory('dadosGeraisService', dadosGeraisService)

    dadosGeraisService.$inject = ['$http', 'avasusService', 'localStorageService', '$q']

    /* @ngInject */
    function dadosGeraisService($http, avasusService, localStorageService, $q) {
        let service = {
                get,
                getPorMes,
            }

        return service

        //////////////

        function get(filtro, atualizar) {
            if (filtro) {
                filtro = [filtro]
            }
            let url = avasusService.getUrl('widesus_dashboard', filtro)

            let dadosGerais = localStorageService.getObject('dados_gerais');
            if (dadosGerais && !atualizar && !filtro) {
                return $q.resolve(dadosGerais);
            }

            return $http.get(url).then(resultado => {
                if (!filtro) {
                    localStorageService.setObject('dados_gerais', resultado.data);
                }
                return resultado.data;
            });
        }

        function getPorMes(data, filtro, atualizar) {
            var params = [{ campo: 'data', valor: data.endOf('month').format('DD/MM/YYYY') }];
            if (filtro && filtro.campo === 'estado') {
                params.push({ campo: 'estado', valor: filtro.valor })
            }
            var url = avasusService.getUrl('widesus_dashboard', params);

            var chave = 'data_' + data.format('YYYY_MM_DD');
            var dadosGeraisMes = localStorageService.getObject(chave);
            if (dadosGeraisMes && !atualizar && !filtro) {
                return $q.resolve(dadosGeraisMes);
            }

            return $http.get(url, { timeout: (a) => a.resolve() }).then(resultado => {
                if (!filtro) {
                    localStorageService.setObject(chave, resultado.data);
                }
                return resultado.data;
            });
        }
    }
})();
