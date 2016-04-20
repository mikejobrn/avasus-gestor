(() => {
    angular
        .module('AvasusGestor')
        .config(config)

        config.$inject = ['$stateProvider']

        /* @ngInject */
        function config($stateProvider) {
            $stateProvider
                .state('inicio', {
                    url: '/inicio',
                    templateUrl: 'js/templates/inicio/inicio.html',
                    controller: 'InicioCtrl',
                    controllerAs: 'vm'
                })
        }
})();
