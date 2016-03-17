(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .controller('DashCtrl', DashCtrl);

    DashCtrl.$inject = ['highchartsNG', '$window'];

    /* @ngInject */
    function DashCtrl(highchartsNG, $window) {
        var vm = this;

        activate();

        function activate() {

        }

        vm.atualizar = function() {
            console.log('oi');
            $window.location.reload();
            $scope.$broadcast('scroll.refreshComplete');
        };
    }
})();
