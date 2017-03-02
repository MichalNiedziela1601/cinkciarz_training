(function(){
    'use strict';
    function TokenHelper(jwtHelper,$sessionStorage){

        this.getIdFromToken = function(){
            var token = $sessionStorage.token;
            var tokenDekoded = jwtHelper.decodeToken(token);
            return tokenDekoded.id;
        };

    }
    angular.module('cinkciarzTraining')
        .service('TokenHelper', ['jwtHelper','$sessionStorage',TokenHelper]);



})();