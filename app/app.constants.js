(() => {
    /*global Highcharts, moment */
    angular
        .module('AvasusGestor')
        .constant('Highcharts', Highcharts)
        .constant('Moment', moment)
        .constant('Eventos', {
            ATUALIZAR_DADOS: 'eventos.atualizar_dados'
        })
})();
