(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .controller('DashCtrl', DashCtrl);

    DashCtrl.$inject = ['$window', '$scope'];

    /* @ngInject */
    function DashCtrl($window, $scope) {
        var vm = this;

        activate();

        function activate() {

        }

        vm.atualizarDash = function() {
            $scope.atualizacao++;
            $scope.$broadcast('scroll.refreshComplete');
        };
    }
})();
