(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .controller('DashCtrl', DashCtrl);

    DashCtrl.$inject = ['avasusService'];

    /* @ngInject */
    function DashCtrl(avasusService) {
        var vm = this;

        activate();

        function activate() {
            avasusService.get().then(
                function (sucesso) {
                    vm.dashboard = sucesso;
                },
                function (erro) {
                    console.log(erro);
                }
            );
        }
    }
})();
