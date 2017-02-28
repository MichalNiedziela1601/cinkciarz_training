/**
 * Created by sunday on 24.02.17.
 */
(function(){
    'use strict';

     function RegisterController(Register){
        var ctrl = this;

         function register(form){
             console.log(form);
             // if(form.$invalid){
             //     console.log('invalid');
             // } else {
                 Register.register(ctrl.person).then(function (data,status,header)
                 {
                     console.log('data',data);
                     console.log('status',status);
                     console.log('header',header);
                 }).catch(function (error)
                 {
                     console.log('error', error);
                 });
             // }
         }

         ctrl.register = register;
    }
    angular.module('cinkciarzTraining')
        .controller('RegisterController', RegisterController);


})();
