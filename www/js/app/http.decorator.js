(() => {
  angular.module('AvasusGestor')
    .config(['$provide', function($provide) {

      $provide.decorator('$http', ['$delegate', '$q', function($delegate, $q) {
        var getFn = $delegate.get;
        var cancelerMap = {};

        function getCancelerKey(method, url) {
          var formattedMethod = method.toLowerCase();
          var formattedUrl = encodeURI(url).toLowerCase().split('?')[0];
          return formattedMethod + '~' + formattedUrl;
        }

        $delegate.get = function() {
          var cancelerKey, canceler, method;
          var args = [].slice.call(arguments);
          var url = args[0];
          var config = args[1] || {};
          if (config.timeout == null) {
            method = 'GET';
            cancelerKey = getCancelerKey(method, url);
            canceler = $q.defer();
            cancelerMap[cancelerKey] = canceler;
            config.timeout = canceler.promise;
            args[1] = config;
          }
          return getFn.apply(null, args);
        };


        $delegate.abort = function(request) {
          console.log('aborting');
          // console.log('Request');
          // console.log(request);
          var cancelerKey, canceler;
          cancelerKey = getCancelerKey(request.method, request.url);
          console.log('CancelerKey');
          console.log(cancelerKey);

          console.log('CancelerMap');
          console.log(cancelerMap);
          canceler = cancelerMap[cancelerKey];
          // canceler = cancelerMap[1];
          // console.log('Canceler');
          // console.log(canceler);

          if (canceler != null) {
            console.log('aborting', cancelerKey);

            // if (request.timeout != null && typeof request.timeout !== 'number') {

              canceler.resolve();
              delete cancelerMap[cancelerKey];
            // }
          }
        };

        return $delegate;
      }]);
    }]);
})();
