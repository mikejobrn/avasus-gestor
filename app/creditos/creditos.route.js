(() => {
    angular
        .module('AvasusGestor')
        .config(config)

        config.$inject = ['$stateProvider', '$urlRouterProvider']

        /* @ngInject */
        function config($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('app.creditos', {
                    url: '/creditos',
                    views: {
                        'menuContent': {
                            templateUrl: 'js/templates/creditos/creditos.html',
                            controller: 'CreditosCtrl',
                            controllerAs: 'vm'
                        }
                    }
                })
        }
})();
