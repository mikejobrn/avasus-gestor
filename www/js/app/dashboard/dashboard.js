(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .controller('DashCtrl', DashCtrl);

    DashCtrl.$inject = ['$window', '$scope', 'localStorageService'];

    /* @ngInject */
    function DashCtrl($window, $scope, localStorageService) {
        var vm = this;

        activate();

        function activate() {

        }

        vm.atualizarDash = function() {
            $scope.atualizacao++;
            localStorageService.clear();
            $scope.$broadcast('scroll.refreshComplete');
        };
    }
})();
