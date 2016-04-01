(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .controller('DashCtrl', DashCtrl);

    DashCtrl.$inject = ['$window', '$scope', 'localStorageService', 'ultimaAtualizacaoService'];

    /* @ngInject */
    function DashCtrl($window, $scope, localStorageService, ultimaAtualizacaoService) {
        var vm = this;

        activate();

        function activate() {

        }

        vm.atualizarDash = function() {
            $scope.atualizacao++;
            $scope.dataAtualizacao = ultimaAtualizacaoService.get();
            localStorageService.clear();
            $scope.$broadcast('scroll.refreshComplete');
        };
    }
})();
