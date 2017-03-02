(function(){
    'use strict';

     function LoginController($location,Auth){
        var ctrl = this;

         function login(){
             Auth.login(ctrl.person.email, ctrl.person.password).then(function(result){
                 $location.path('/start');
             });
         }

         ctrl.login = login;

    }
    angular.module('cinkciarzTraining')
        .controller('LoginController', ['$location','Auth',LoginController]);


})();