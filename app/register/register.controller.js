/**
 * Created by sunday on 24.02.17.
 */
(function(){
    'use strict';

     function RegisterController($timeout,Register){
        var ctrl = this;
         ctrl.showErrors = false;
         ctrl.errors = {};
         ctrl.response = {
             success: true

         };
         function register(form){
             if(form.$invalid){

                 ctrl.showErrors = true;
                 $timeout(function() { ctrl.showErrors = false; }, 3500);
             } else {
                 Register.register(ctrl.person).then(function (data)
                 {
                     ctrl.response.success = data.success;
                     ctrl.response.error = data.error;
                     if(false === ctrl.response.success){
                         if(ctrl.response.error.constraint === 'person_email_key'){
                             ctrl.errors.message = 'This email was used to register. Try another';
                         }
                     }
                     ctrl.showErrors = true;
                     $timeout(function() { ctrl.showErrors = false; ctrl.response.success = true;}, 3500);

                 }).catch(function (error)
                 {
                     console.log('error', error);
                 });
             }
         }



         ctrl.register = register;
    }
    angular.module('cinkciarzTraining')
        .controller('RegisterController', ['$timeout','Register',RegisterController]);


})();
