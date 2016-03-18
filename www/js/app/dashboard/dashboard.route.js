(
  function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .config(config);

        config.$inject = ['$stateProvider'];

        /* @ngInject */
        function config($stateProvider) {
            $stateProvider
                .state('app.dash', {
                    url: '/dash',
                    views: {
                        'menuContent': {
                            templateUrl: 'js/app/dashboard/dashboard.html',
                            controller: 'DashCtrl',
                            controllerAs: 'vm'
                        }
                    }
                });
        }
})();
