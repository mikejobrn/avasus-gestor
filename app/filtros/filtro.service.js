(() => {
    angular
        .module('AvasusGestor')
        .factory('filtroService', filtroService)

    filtroService.$inject = []

    /* @ngInject */
    function filtroService() {
        let filtro

        let service = {
            set,
            get,
        }

        return service

        function set(filtro) {
            this.filtro = filtro
        }

        function get() {
            return this.filtro
        }
    }
})();
