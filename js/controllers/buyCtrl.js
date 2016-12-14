/**
 * Created by student on 06.12.16.
 */
(function ()
{
    'use strict';
    function BuyController($routeParams, WalletService, CurrenciesService, $timeout, $window, ValidateService)
    {

        var vm = this;
        vm.currency = $routeParams.currency;
        vm.rates = {};
        vm.value = 0;
        vm.wallet = WalletService.getWallet();
        vm.validObject = {
            show: false, message: ''
        };

        ///////////////////

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

        function buy()
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
            if (value > vm.wallet[vm.currency]) {
                vm.validObject = ValidateService.getValues(true, 'Za mało środków');
                $timeout(function ()
                {
                    vm.validObject = ValidateService.getValues(false, '');
                }, 3000);
            } else {
                WalletService.buy(vm.rate.code, vm.rate.rates[0].bid, value);
                vm.wallet = WalletService.getWallet();
            }

        }

        function validateValue()
        {
            if (vm.value === undefined || vm.value === '' || parseInt(vm.value, 10) === 0) {
                vm.divShow = true;
                vm.message = 'Nie wpisałeś ilości';
                $timeout(function ()
                {
                    vm.message = '';
                    vm.divShow = false;
                }, 5000);
                return true;
            } else {
                vm.divShow = false;
                return false;
            }
        }

        function getCurrencies()
        {
            CurrenciesService.getCurrencies()
                    .then(function (data)
                    {
                        vm.rates = data;
                        for (var k in vm.rates) {
                            if (vm.rates[k].data.code === vm.currency) {
                                vm.rate = vm.rates[k].data;
                            }
                        }

                    })
                    .catch(function (error)
                    {
                        console.log('Error', error);
                    });
        }


        ////////////////////////

        vm.showTitle = showTitle;
        vm.buy = buy;
        vm.validateValue = validateValue;
        getCurrencies();

    }

    angular.module('cinkciarzTraining')
            .controller('BuyController', BuyController);


})();
