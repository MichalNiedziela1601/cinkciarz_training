(function(){
    'use strict';

     function RegisterController($timeout,$location,Register,Auth){
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
                         if(ctrl.response.error === 'Istnieje już taka nazwa użytkownika'){
                             ctrl.errors.message = 'This email was used to register. Try another';
                         }
                         ctrl.showErrors = true;
                         $timeout(function() { ctrl.showErrors = false; ctrl.response.success = true;}, 3500);
                     }else{
                         Auth.login(ctrl.person.email,ctrl.person.password).then(function(){
                             $location.path('/start');
                         });
                     }


                 }).catch(function (error)
                 {
                     console.log('error', error);
                 });
             }
         }



         ctrl.register = register;
    }
    angular.module('cinkciarzTraining')
        .controller('RegisterController', ['$timeout','$location','Register','Auth',RegisterController]);


})();
