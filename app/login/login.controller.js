(function () {
    'use strict';
    function LoginController($location, $timeout, Auth,lodash) {
        var ctrl = this;
        ctrl.showErrors = false;
        ctrl.errors = {};
        ctrl.response = {
            success: true

        };

        function login(form) {
            if (form.$invalid) {
                ctrl.showErrors = true;
                $timeout(function () {
                    ctrl.showErrors = false;
                }, 3500);
            } else {
                Auth.login(ctrl.person.email, ctrl.person.password).then(function (result) {
                    if(lodash.has(result, 'message')){
                        ctrl.errors.message = 'User not found';
                        ctrl.showErrors = true;
                        ctrl.response.success = false;
                        $timeout(function() { ctrl.showErrors = false; ctrl.response.success = true;}, 3500);
                    }else {
                        $location.path('/start');
                    }
                });
            }

        }

        ctrl.login = login;

    }

    angular.module('cinkciarzTraining')
        .controller('LoginController', ['$location', '$timeout', 'Auth','lodash', LoginController]);


})();