(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .controller('DashCtrl', DashCtrl);

    DashCtrl.$inject = ['highchartsNG', '$window', '$scope'];

    /* @ngInject */
    function DashCtrl(highchartsNG, $window, $scope) {
        var vm = this;

        $scope.$on('$ionicView.enter', activate());

        function activate() {

        }

        vm.atualizar = function() {
            console.log('Página atualizada');
            var antigoFiltro = vm.filtro;
            vm.filtro = '';
            // vm.filtro = antigoFiltro;
            // $window.location.reload();
            $scope.$broadcast('scroll.refreshComplete');
        };
    }
})();
