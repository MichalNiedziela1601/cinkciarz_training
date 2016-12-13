/**
 * Created by sunday on 12/1/16.
 */

(function ()
{
    'use strict';
    angular.module('cinkciarzTraining')
            .controller('MainCtrl', MainCtrl)
            .controller('ModalConfirmController', ModalConfirmController);

    ////////////////////////////////////

    function MainCtrl($location, WalletService, $localStorage, CurrenciesService, $uibModal)
    {
        var vm = this;
        vm.storage = $localStorage;

        vm.wallet = WalletService.getWallet();
        vm.rates = {};
        getCurrencies();

        vm.reset = reset;
        vm.check = check;
        //////////////////////


        function reset()
        {
            var modalInstance = $uibModal.open({
                animation: true, templateUrl: 'myModalConfirm.html', controller: 'ModalConfirmController', controllerAs: 'vm', backdrop: 'static'

            });

            modalInstance.result.then(function ()
            {
                WalletService.reset();
                $location.path('/');
            }, function ()
            {
                return;
            });
        }

        function check(code)
        {
            return $localStorage.wallet[code] <= 0;
        }


        function getCurrencies()
        {
            CurrenciesService.getCurrencies()
                    .then(function (data)
                    {
                        vm.rates = data;
                    }, function (error)
                    {
                        console.log('Error ', error);
                    });
        }

    }

    ///////////////////////////////////
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

})();
