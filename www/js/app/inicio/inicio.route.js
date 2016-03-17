(
  function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('inicio', {
                    url: '/inicio',
                    templateUrl: 'js/app/inicio/inicio.html',
                    controller: 'InicioCtrl',
                    controllerAs: 'vm'
                });
        });
})();
