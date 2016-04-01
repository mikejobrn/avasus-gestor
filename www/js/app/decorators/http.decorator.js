(() => {
    angular
        .module('AvasusGestor')
        .config(provide)

        provide.$inject = ['$provide']

        function provide($provide) {
            $provide.decorator('$http', delegate)

            delegate.$inject = ['$delegate', '$q']

            function delegate($delegate, $q) {
                let getFn = $delegate.get;
                let cancelerMap = {};

                function getCancelerKey(method, url) {
                    let formattedMethod = method.toLowerCase();
                    let formattedUrl = url
                    return formattedMethod + '~' + formattedUrl;
                }

                $delegate.get = (...args) => {
                    let cancelerKey, canceler, method;
                    let url = args[0];
                    let config = args[1] || {};
                    // if (config.timeout === null) {
                        method = 'GET';
                        cancelerKey = getCancelerKey(method, url);
                        canceler = $q.defer();
                        cancelerMap[cancelerKey] = canceler;
                        config.timeout = canceler.promise;
                        args[1] = config;
                    // }
                    return getFn.apply(null, args);
                };

                $delegate.abort = request => {
                    var cancelerKey, canceler;
                    cancelerKey = getCancelerKey(request.method, request.url);
                    canceler = cancelerMap[cancelerKey];

                    if (canceler != null) {
                        if (request.timeout !== null && typeof request.timeout !== 'number') {
                            canceler.resolve();
                            delete cancelerMap[cancelerKey];
                        }
                    }
                };

                return $delegate;
            }
        }
})();
