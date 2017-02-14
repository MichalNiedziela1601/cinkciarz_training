(function ()
{
    'use strict';

    function SellController($routeParams, WalletService, $timeout, ValidateService, RatesFactory)
    {
        var ctrl = this;
        ctrl.currency = $routeParams.currency;
        ctrl.rate = {};
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

            if (ctrl.value < 0) {
                ctrl.errorMessage = ValidateService.getValues('Wpisałeś wartość poniżej zera');
                $timeout(function ()
                {
                    ctrl.errorMessage = ValidateService.getValues('');
                }, 3000);
                return;
            }
            if (ctrl.value > ctrl.wallet[ctrl.currency]) {
                ctrl.errorMessage = ValidateService.getValues('Za mało środków');
                $timeout(function ()
                {
                    ctrl.errorMessage = ValidateService.getValues('');
                }, 3000);

            } else {
                WalletService.sell(ctrl.rate.code, ctrl.rate.sell, ctrl.value);
                ctrl.wallet = WalletService.getWallet();
                ctrl.value = 0;
            }

        }

        function sellCost()
        {
            return (ctrl.value * ctrl.rate.sell) > 0 ? (ctrl.value * ctrl.rate.sell) : 0;
        }

        function getCurrencies()
        {
            ctrl.rates = RatesFactory.getRates();
            angular.forEach(ctrl.rates, function (rate)
            {
                if (rate.code === ctrl.currency) {
                    ctrl.rate = rate;
                }
            });
            ctrl.sellCost = sellCost;

        }


        ctrl.showTitle = showTitle;
        ctrl.sell = sell;

        ctrl.getCurrencies = getCurrencies();


        ///////////////////////

    }


    angular.module('cinkciarzTraining')
            .controller('SellController', SellController);
})();
