(function () {
    'use strict';
    function AuthFactory($http, $sessionStorage) {

        function getToken() {
            return $sessionStorage.token;
        }

        function isAuthenticated() {
            return $sessionStorage.token ? true : false;
        }


        function login(email, password) {
            return $http.post('http://localhost:3000/api/login', {
                email: email,
                password: password
            }).then(function (response) {
                $sessionStorage.token = response.data.token;
                return response.data;
            }).catch(function (error) {
                delete $sessionStorage.token;
            });
        }

        function logout() {

            delete $sessionStorage.token;

        }

        return {
            login: login,
            getToken: getToken,
            isAuthenticated: isAuthenticated,
            logout: logout
        };

    }

    angular.module('cinkciarzTraining')
        .factory('Auth', ['$http', '$sessionStorage', AuthFactory]);


})();