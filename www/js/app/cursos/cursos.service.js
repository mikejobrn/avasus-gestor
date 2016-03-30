(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .factory('cursoService', cursoService);

    cursoService.$inject = ['avasusService', 'localStorageService', '$http', '$q'];

    /* @ngInject */
    function cursoService(avasusService, localStorageService, $http, $q) {
        var service = {
            getCursos: getCursos,
            ordenarPorNome: ordenarPorNome,
            getDetalhes: getDetalhes,
            getResumoPorEstado: getResumoPorEstado
        };

        return service;

        ///////////////

        function getCursos(filtro, atualizar) {
            var url = avasusService.getUrl('widesus_dashboard_curso');

            if (filtro && filtro.valor) {
                url += '&' + filtro.campo + '=' + filtro.valor;
            }

            var cursosSalvos = localStorageService.getObject('listaCursos');
            if (cursosSalvos && !atualizar && !filtro) {
                return $q.resolve(cursosSalvos);
            }

            return $http.get(url).then(
                function (resultado) {
                    if (!filtro) {
                        localStorageService.setObject('listaCursos', resultado.data);
                    }
                    return resultado.data;
                }
            );
        }

        function ordenarPorNome(cursos) {
            return cursos.sort(function(a, b) {
                return a.curso.localeCompare(b.curso);
            });
        }

        function getDetalhes(filtro) {
            var url = avasusService.getUrl('widesus_dashboard_curso');

            if (filtro && filtro.valor) {
                url += '&' + filtro.campo + '=' + filtro.valor;
            }

            return $http.get(url).then(
                function (resultado) {
                    return resultado.data;
                }
            );
        }

        function getResumoPorEstado(estado, filtro, atualizar) {
            var url = avasusService.getUrl('widesus_dashboard', '&estado=' + estado);

            if (filtro && filtro.valor && filtro.campo != 'estado') {
                url += '&' + filtro.campo + '=' + filtro.valor;
            }

            var estadoSalvo = localStorageService.getObject('estado_' + estado);
            if (estadoSalvo && !atualizar && !filtro) {
                return $q.resolve(estadoSalvo);
            }

            return $http.get(url).then(
                function (resultado) {
                    if (!filtro) {
                        localStorageService.setObject('estado_' + estado, resultado.data);
                    }
                    return resultado.data;
                }
            );
        }
    }
})();
