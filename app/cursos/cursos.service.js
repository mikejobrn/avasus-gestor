(() => {
    angular
        .module('AvasusGestor')
        .factory('cursoService', cursoService)

    cursoService.$inject = ['avasusService', 'localStorageService', '$http', '$q']

    /* @ngInject */
    function cursoService(avasusService, localStorageService, $http, $q) {
        let service = {
            getCursos,
            ordenarPorNome,
            getResumoPorEstado,
        }

        return service

        ///////////////

        function getCursos(filtro, atualizar) {
            if (filtro && filtro.campo === 'curso') {
                filtro.campo = 'cursos'
            }
            let url = avasusService.getUrl('widesus_dashboard_curso', filtro)
            let cursosSalvos = localStorageService.getObject('listaCursos')
            if (cursosSalvos && !atualizar && !filtro) {
                return $q.resolve(cursosSalvos)
            }

            return $http.get(url).then(resultado => {
                if (!filtro) {
                    localStorageService.setObject('listaCursos', resultado.data)
                }
                return resultado.data
            })
        }

        function ordenarPorNome(cursos) {
            return cursos.sort((a, b) => a.curso.localeCompare(b.curso));
        }

        function getResumoPorEstado(estado, filtro, atualizar) {
            let url = avasusService.getUrl('widesus_dashboard', [{ campo: 'estado', valor: estado }])

            if (filtro && filtro.valor && filtro.campo !== 'estado') {
                url += `&${filtro.campo}=${filtro.valor}`
            }

            let estadoSalvo = localStorageService.getObject('estado_' + estado)
            if (estadoSalvo && !atualizar && !filtro) {
                return $q.resolve(estadoSalvo)
            }

            return $http.get(url).then(resultado => {
                if (!filtro) {
                    localStorageService.setObject('estado_' + estado, resultado.data)
                }
                return resultado.data
            })
        }
    }
})();
