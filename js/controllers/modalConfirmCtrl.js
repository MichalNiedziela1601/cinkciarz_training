/**
 * Created by student on 13.12.16.
 */
(function(){
    'use strict';

    function ModalConfirmController($uibModalInstance)
    {
        var vm = this;

        vm.ok = function ()
        {
            $uibModalInstance.close();
        };

        vm.cancel = function ()
        {
            $uibModalInstance.dismiss();
        };
    }

    angular.module('cinkciarzTraining')
        .controller('ModalConfirmController', ModalConfirmController);


})();
