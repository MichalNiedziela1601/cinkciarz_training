/**
 * Created by student on 13.12.16.
 */
(function(){
    'use strict';

    function ModalConfirmController($uibModalInstance)
    {
        var ctrl = this;

        ctrl.ok = function ()
        {
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
