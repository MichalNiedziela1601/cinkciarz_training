/**
 * Created by student on 06.12.16.
 */
(function ()
{
    'use strict';

    function SellController($routeParams, WalletService, CurrenciesService, $timeout, ValidateService)
    {
        var ctrl = this;
        ctrl.currency = $routeParams.currency;
        ctrl.rates = {};
        ctrl.value = 0;

        ctrl.wallet = WalletService.getWallet();
        ctrl.errorMessage = '';

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
            if (ValidateService.validateEmpty(ctrl.value)) {
                ctrl.errorMessage = ValidateService.getValues('Nie wpisałeś ilości');
                $timeout(function ()
                {
                    ctrl.errorMessage = ValidateService.getValues('');
                }, 3000);
                return;
            }

            if(ctrl.value < 0){
                ctrl.errorMessage = ValidateService.getValues('Wpisałeś wartość poniżej zera');
                $timeout(function ()
                {
                    ctrl.errorMessage = ValidateService.getValues('');
                }, 3000);
                return;
            }
            if (ctrl.value > ctrl.wallet[ctrl.currency]) {
                ctrl.validObject = ValidateService.getValues(true, 'Za mało środków');
                $timeout(function ()
                {
                    ctrl.validObject = ValidateService.getValues(false, '');
                }, 3000);

            } else {
                WalletService.sell(ctrl.rate.code, ctrl.rate.sell, ctrl.value);
                ctrl.wallet = WalletService.getWallet();
                ctrl.value = 0;
            }

        }

        function getCurrencies()
        {
            CurrenciesService.getCurrencies()
                    .then(function (data)
                    {
                        var rates = data;
                        for (var key in rates) {
                            if (rates[key].code === ctrl.currency) {
                                ctrl.rate = rates[key];
                            }
                        }
                        ctrl.sellCost = sellCost;

                    })
                    .catch(function (error)
                    {
                        console.log('Error ', error);
                    });
        }

        function sellCost()
        {
            return (ctrl.value * ctrl.rate.sell) > 0 ? (ctrl.value * ctrl.rate.sell) : 0;
        }


        ctrl.showTitle = showTitle;
        ctrl.sell = sell;

        getCurrencies();


        ///////////////////////

    }


    angular.module('cinkciarzTraining')
            .controller('SellController', SellController);
})();
