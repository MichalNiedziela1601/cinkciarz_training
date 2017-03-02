(function ()
{
    'use strict';

    function StartController($location, $uibModal, $sessionStorage, WalletService,lodash)
    {
        var ctrl = this;
        $sessionStorage.isRandom = false;

        ctrl.open = function ()
        {
            ctrl.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                controller: 'ModalController',
                controllerAs: 'startModal',
                backdrop: 'static',
                windowClass: 'app-modal-window'

            });

            ctrl.modalInstance.result.then(function (startValue)
            {

                ctrl.startVal = parseInt(startValue, 10);
                WalletService.setStartValue(ctrl.startVal).then(function(){

                     $location.path('/main');
                });

            });
        };
        ctrl.checkStorage = function()
        {
            if (null == ctrl.wallet || lodash.isEqual(ctrl.wallet, { PLN: 0, EUR: 0, GBP: 0, USD: 0}) || lodash.isEmpty(ctrl.wallet)) {
                ctrl.open('sm');
            } else {
                $location.path('/main');
            }
        };
        ctrl.getWallet = function(){
            WalletService.getWallet().then(function(data){
                ctrl.wallet = data;
                ctrl.checkStorage();
            });
        };
        ctrl.getWallet();


    }



    angular.module('cinkciarzTraining')
            .controller('StartController', StartController);

    ////////////////////////


})();
