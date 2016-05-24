(() => {
    angular
        .module('AvasusGestor')
        .constant('avasusConstantes', {
            API_URL: 'https://avasus.ufrn.br',
            API_SERVICO: 'local/avasplugin/dashboard/request.php'
            // API_SERVICO: 'webservice/rest/server.php',
            // API_TOKEN: '3b57e8ca0e179f41d8c97e34fb2eb7bf'
        })
})();
