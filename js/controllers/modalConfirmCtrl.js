(function ()
{
    'use strict';

    function ModalConfirmController($uibModalInstance,$localStorage)
    {

        var ctrl = this;

        ctrl.ok = function ()
        {
            $localStorage.log = [];
            $uibModalInstance.close();
        };

        ctrl.cancel = function ()
        {
            $uibModalInstance.dismiss();
        };
    }

    angular.module('cinkciarzTraining')
            .controller('ModalConfirmController', ModalConfirmController);


})();
