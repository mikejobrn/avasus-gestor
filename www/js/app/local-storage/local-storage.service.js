(function() {
    'use strict';

    angular
        .module('AvasusGestor')
        .factory('localStorageService', localStorageService);

    localStorageService.$inject = ['$window'];

    /* @ngInject */
    function localStorageService($window) {
        var service = {
            set: set,
            get: get,
            setObject: setObject,
            getObject: getObject,
            remove: remove,
            clear: clear
        };

        return service;

        ///////////////

        function set(key, value) {
            $window.localStorage[key] = value;
        }

        function get(key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        }

        function setObject(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        }

        function getObject(key, defaultValue) {
            if ($window.localStorage[key]) {
                return JSON.parse($window.localStorage[key]);
            }
            return defaultValue;
        }

        function remove(key) {
            $window.localStorage.removeItem(key);
        }

        function clear() {
            $window.localStorage.clear();
        }
    }
})();
