(() => {
    angular
        .module('AvasusGestor')
        .config(config)

        config.$inject = ['$stateProvider', '$urlRouterProvider', '$compileProvider']

        /* @ngInject */
        function config($stateProvider, $urlRouterProvider, $compileProvider) {
            // Ionic uses AngularUI Router which uses the concept of states
            // Learn more here: https://github.com/angular-ui/ui-router
            // Set up the various states which the app can be in.
            // Each state's controller can be found in controllers.js
            $stateProvider
                // setup an abstract state for the side-menu directive
                .state('app', {
                    url: '/app',
                    abstract: true,
                    templateUrl: 'js/templates/menu/menu.html',
                    controller: 'AppCtrl',
                    controllerAs: 'vm'
                })

            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/dash')

            $compileProvider.debugInfoEnabled(false)
        }
})();
