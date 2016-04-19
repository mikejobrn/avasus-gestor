(() => {
    angular
        .module('AvasusGestor')
        .factory('filtroService', filtroService)

    filtroService.$inject = ['$rootScope']

    /* @ngInject */
    function filtroService($rootScope) {
        let filtro

        let service = {
            set,
            get,
        }

        return service

        function set(filtro) {
            this.filtro = filtro
            $rootScope.$emit('publico.atualizarFiltro', filtro)
        }

        function get() {
            return this.filtro
        }
    }
})();
