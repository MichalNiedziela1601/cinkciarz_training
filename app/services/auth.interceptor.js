(function(){
    'use strict';
    function AuthInterceptorFactory($sessionStorage) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($sessionStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $sessionStorage.token;
                }
                return config;
            }
        };
    }
    angular.module('cinkciarzTraining')
        .factory('AuthInterceptorFactory', ['$sessionStorage',AuthInterceptorFactory]);



})();