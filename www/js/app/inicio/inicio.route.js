(
  function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .config(config);

        config.$inject = ['$stateProvider', '$urlRouterProvider'];

        /* @ngInject */
        function config($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('inicio', {
                    url: '/inicio',
                    templateUrl: 'js/app/inicio/inicio.html',
                    controller: 'InicioCtrl',
                    controllerAs: 'vm'
                });
        }
})();
