(() => {
    angular
        .module('AvasusGestor')
        .config(config)

        config.$inject = ['$stateProvider', '$urlRouterProvider']

        /* @ngInject */
        function config($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('app.contato', {
                    url: '/contato',
                    views: {
                    'menuContent': {
                        templateUrl: 'js/app/contato/contato.html',
                        controller: 'ContatoCtrl',
                        controllerAs: 'vm'
                        }
                    }
                })
        }
})();
