/**
 * Created by student on 06.12.16.
 */
(function ()
{
    'use strict';
    angular.module('cinkciarzTraining')
            .controller('SellController', SellController);
    function SellController($scope, $routeParams, WalletService, CurrenciesService, $timeout, $window)
    {
        var vm = this;
        vm.currency = $routeParams.currency;
        vm.rates = {};
        vm.showTitle = showTitle;
        vm.sell = sell;
        vm.divShow = false;
        vm.wallet = WalletService.getWallet();
        vm.validateValue = validateValue;
        vm.message = '';
        vm.back = back;
        getCurrencies();


        ///////////////////////
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
            if (validateValue()) {
                return;
            } else {
                var value = parseInt($scope.value, 10);
                if (value * vm.rate.rates[0].ask > vm.wallet.PLN) {
                    vm.divShow = true;
                    vm.message = 'Za mało środków';
                    $timeout(function ()
                    {
                        vm.divShow = false;
                    }, 5000);

                } else {
                    WalletService.sell(vm.rate.code, vm.rate.rates[0].ask, value);
                    vm.wallet = WalletService.getWallet();
                }
            }
        }

        function validateValue()
        {
            if ($scope.value === undefined || $scope.value === '' || parseInt($scope.value, 10) === 0) {
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
                        var rates = data;
                        for (var k in rates) {
                            if (rates[k].data.code === vm.currency) {
                                vm.rate = rates[k].data;
                            }
                        }

                    }, function (error)
                    {
                        console.log('Error ', error);
                    });
        }

        function back()
        {
            $window.history.back();
        }
    }

})();
