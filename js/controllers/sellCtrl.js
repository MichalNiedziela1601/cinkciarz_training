/**
 * Created by student on 06.12.16.
 */
(function ()
{
    'use strict';

    function SellController($routeParams, WalletService, CurrenciesService, $timeout, $window, ValidateService)
    {
        var vm = this;
        vm.currency = $routeParams.currency;
        vm.rates = {};
        vm.value = 0;

        vm.wallet = WalletService.getWallet();
        vm.validObject = {
            show: false, message: ''
        };

        ////////////////////

        function showTitle()
        {
            if ($routeParams.currency === 'EUR') {
                return 'Euro';
            } else if ($routeParams.currency === 'USD') {
                return 'Dolarów';
            } else if ($routeParams.currency === 'GBP') {
                return 'Funtów';
            }
        }

        function sell()
        {
            if (ValidateService.validateEmpty(vm.value)) {
                vm.validObject = ValidateService.getValues(true, 'Nie wpisałeś ilości');
                $timeout(function ()
                {
                    vm.validObject = ValidateService.getValues(false, '');
                }, 3000);
                return;
            }

            var value = parseInt(vm.value, 10);
            if (value * vm.rate.rates[0].ask > vm.wallet.PLN) {
                vm.validObject = ValidateService.getValues(true, 'Za mało środków');
                $timeout(function ()
                {
                    vm.validObject = ValidateService.getValues(false, '');
                }, 3000);

            } else {
                WalletService.sell(vm.rate.code, vm.rate.rates[0].ask, value);
                vm.wallet = WalletService.getWallet();
            }

        }

        function getCurrencies()
        {
            CurrenciesService.getCurrencies()
                    .then(function (data)
                    {
                        var rates = data;
                        for (var k in rates) {
                            if (rates[k].data.code === vm.currency) {
                                vm.rate = rates[k].data;
                            }
                        }

                    })
                    .catch(function (error)
                    {
                        console.log('Error ', error);
                    });
        }


        vm.showTitle = showTitle;
        vm.sell = sell;
        getCurrencies();


        ///////////////////////

    }


    angular.module('cinkciarzTraining')
            .controller('SellController', SellController);
})();
