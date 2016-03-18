(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .controller('DashCtrl', DashCtrl);

    DashCtrl.$inject = ['highchartsNG', '$window', '$scope'];

    /* @ngInject */
    function DashCtrl(highchartsNG, $window, $scope) {
        var vm = this;

        vm.atualizar = function() {
            console.log('Página atualizada');
            console.log($scope.filtro);
            var antigoFiltro = vm.filtro;
            vm.filtro = '';
            if ($scope.filtro) {
                vm.filtro = $scope.filtro; //.valor;
            }
            // vm.filtro = antigoFiltro;
            // $window.location.reload();
            $scope.$broadcast('scroll.refreshComplete');
        };

        $scope.$on('$ionicView.enter', activate());

        $scope.$watch('filtro', function() {
            activate();
        });

        function activate() {
            vm.atualizar();
        }


    }
})();
