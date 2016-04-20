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
                .state('app.avaliacao', {
                    url: '/avaliacao',
                    views: {
                        'menuContent': {
                        templateUrl: 'js/templates/avaliacao/avaliacao.html',
                            controller: 'AvaliacaoCtrl',
                            controllerAs: 'vm'
                        }
                    }
                });
        }
})();
