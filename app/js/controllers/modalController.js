(function(){
    'use strict';

    function ModalController($uibModalInstance, $timeout)
    {
        var ctrl = this;
        ctrl.divHide = true;
        ctrl.disabled = false;
        ctrl.message = '';


        ctrl.ok = function ()
        {
            if (ctrl.value === undefined) {
                ctrl.showErrorMessage('Nie wpisałeś wartości');
            } else if (ctrl.value < 1) {
                ctrl.showErrorMessage('Wpisałeś ujemną lub zerową wartość');
            }

            else {
                $uibModalInstance.close(ctrl.value);
            }
        };

        ctrl.cancel = function ()
        {
            $uibModalInstance.dismiss('cancel');
        };
        ctrl.showErrorMessage = function (message)
        {
            ctrl.divHide = false;
            ctrl.message = message;
            $timeout(function ()
            {
                ctrl.divHide = true;
                ctrl.message = '';

            }, 3500);
        };

    }

    angular.module('cinkciarzTraining')
        .controller('ModalController', ModalController);


})();
