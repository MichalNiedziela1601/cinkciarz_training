(function ()
{
    'use strict';
    function BuyController($routeParams, WalletService, $timeout, ValidateService, RatesFactory)
    {

        var ctrl = this;
        ctrl.currency = $routeParams.currency;
        ctrl.rates = RatesFactory.getRates();
        ctrl.value = 0;
        ctrl.errorMessage = '';

        ctrl.getWallet = function()
        {
            WalletService.getWallet().then(function (data)
            {
                ctrl.wallet = data;
            });
        };
        ctrl.getWallet();

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

            if (ctrl.value * ctrl.rate.buy > ctrl.wallet.PLN) {
                ctrl.errorMessage = ValidateService.getValues('Za mało środków');
                $timeout(function ()
                {
                    ctrl.errorMessage = ValidateService.getValues('');
                }, 3000);
            } else {
                WalletService.buy(ctrl.wallet,ctrl.rate.code, ctrl.rate.buy, ctrl.value);
                ctrl.getWallet();
                ctrl.value = 0;
            }

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

            ctrl.buyCost = function ()
            {
                return (ctrl.value * ctrl.rate.buy) > 0 ? (ctrl.value * ctrl.rate.buy) : 0;
            };

        }

////////////////////////

        ctrl.showTitle = showTitle;
        ctrl.buy = buy;
        ctrl.getCUrrencies = getCurrencies();


    }

    angular.module('cinkciarzTraining')
            .controller('BuyController', BuyController);


})();
