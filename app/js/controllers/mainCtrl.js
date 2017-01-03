/**
 * Created by sunday on 12/1/16.
 */

(function ()
{
    'use strict';
    function MainCtrl($location, WalletService, $localStorage, CurrenciesService, $uibModal)
    {
        var ctrl = this;
        ctrl.wallet = WalletService.getWallet();
        ctrl.rates = [];

        ////////////////////////////////
        function reset()
        {
            var modalInstance = $uibModal.open({
                animation: true, templateUrl: 'myModalConfirm.html', controller: 'ModalConfirmController', controllerAs: 'ctrl', backdrop: 'static'

            });

            modalInstance.result.then(function ()
            {
                $location.path('/');
                WalletService.reset();
            });
        }

        function checkCurrencyWallet(code)
        {
            return $localStorage.wallet[code] <= 0;
        }


        function getCurrencies()
        {
            CurrenciesService.getCurrencies()
                    .then(function (data)
                    {
                        ctrl.rates = data;
                    })
                    .catch(function (error)
                    {
                        console.log('Error ', error);
                    });
        }

        ///////////////////////////////

        getCurrencies();

        ctrl.reset = reset;
        ctrl.checkCurrencyWallet = checkCurrencyWallet;
        //////////////////////

    }
    angular.module('cinkciarzTraining')
            .controller('MainCtrl', MainCtrl);

})();
