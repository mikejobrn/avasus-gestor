(() => {
    angular
        .module('AvasusGestor')
        .directive('agCard', agCard)

    /* @ngInject */
    function agCard() {
        let directive = {
            restrict: 'EA',
            templateUrl: 'js/templates/card/card.html',
            scope: {
                titulo: '@',
                subtitulo: '@',
                status: '=',
            },
            link: linkFunc,
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true,
            transclude: true,
        }

        return directive

        function linkFunc(scope, el, attr, ctrl) {

        }
    }

    Controller.$inject = ['$scope']

    /* @ngInject */
    function Controller($scope) {
        let vm = this

        activate()

        function activate() {

        }
    }
})();
