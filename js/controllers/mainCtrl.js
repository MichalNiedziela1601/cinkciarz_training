/**
 * Created by sunday on 12/1/16.
 */

(function ()
{
    'use strict';
    function MainCtrl($location, WalletService, $localStorage, CurrenciesService, $uibModal)
    {
        var vm = this;
        vm.wallet = WalletService.getWallet();
        vm.rates = {};

        ////////////////////////////////
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

        ///////////////////////////////

        getCurrencies();

        vm.reset = reset;
        vm.check = check;
        //////////////////////



    }
    angular.module('cinkciarzTraining')
            .controller('MainCtrl', MainCtrl);

})();
