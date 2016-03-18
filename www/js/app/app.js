(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$ionicModal', '$scope'];

    /* @ngInject */
    function AppCtrl($ionicModal, $scope) {
        var vm = this;

        activate();

        function activate() {
            $ionicModal.fromTemplateUrl("js/app/filtro/filtro.modal.html", {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });

            $scope.abrirModalFiltroDados = function () {
                $scope.modal.show();
            };

            $scope.fecharModalFiltroDados = function () {
                $scope.modal.hide();
            };
        }
    }
})();
