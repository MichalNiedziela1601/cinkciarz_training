(function () {
    'use strict';
    function Register($http) {
        var url = 'http://localhost:3000/api/register';

        this.register = function (person) {
            return $http.post(url,  person).then(function (response) {
                return response.data;
            })
                .catch(function (error) {
                    return error.data;
                });
        };
    }

    angular.module('cinkciarzTraining')
        .service('Register', ['$http', Register]);


})();
