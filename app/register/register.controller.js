/**
 * Created by sunday on 24.02.17.
 */
(function(){
    'use strict';

     function RegisterController(Register){
        var ctrl = this;

         function register(){
             console.log(ctrl.person);
             Register.register(ctrl.person).then(function(data){
                 console.log(data);
             }).catch(function(error){
                 console.log('error',error);
             });
         }

         ctrl.register = register;
    }
    angular.module('cinkciarzTraining')
        .controller('RegisterController', RegisterController);


})();