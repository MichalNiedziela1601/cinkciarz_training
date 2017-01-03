/**
 * Created by student on 16.12.16.
 */
(function ()
{
    'use strict';

    function RandomCurrencyService(RatesFactory, CurrenciesService)
    {

        var randomRates = RatesFactory.getRates();
        var orginalRates = CurrenciesService.getCurrencies()
                .then(function (data)
                {
                    orginalRates = data;
                })
                .catch(function (error)
                {
                    console.log('Error occured', error);
                });


        function randomValue()
        {
            return (Math.random()).toFixed(2);
        }


        function operations(currency,operation){
            currency = parseFloat(currency);
            var value = parseFloat(randomValue()).toFixed(2);
            switch (operation){
                case '-' :
                    currency -= currency * value / 100;
                    break;
                case '+' :
                    currency += currency * value / 100;
                    break;
            }

            currency = currency.toFixed(4);
            return currency;
        }

        function randomOperations(currency)
        {
            var random = Math.floor(Math.random() * 2);
            var value = 0;
            if (0 === random) {
                value = operations(currency, '-');
            } else {
                value = operations(currency,'+');
            }
            return value;
        }

        this.setRandomRates = function ()
        {

            for (var i = 0; i < orginalRates.length; i++) {
                var randomBuy = parseFloat(randomOperations(orginalRates[i].buy));
                randomRates[i].buy = randomBuy;
                while (isDiffrentToBig(orginalRates[i].buy, randomBuy)) {
                    randomRates[i].buy = parseFloat(randomOperations(orginalRates[i].buy));
                }
                var randomSell = parseFloat(randomOperations(orginalRates[i].sell));
                randomRates[i].sell = randomSell;
                while (isDiffrentToBig(orginalRates[i].sell, randomSell)) {
                    randomRates[i].sell = parseFloat(randomOperations(orginalRates[i].sell));
                }
            }
            RatesFactory.addRates(randomRates);
        };

        function isDiffrentToBig(original, random)
        {
            return mathDiff(original, random) > 5;
        }

        function mathDiff(original, random)
        {
            return Math.abs(((original - random) / original) * 100);
        }


        this.getRandomRates = function ()
        {
            return randomRates;
        };


    }

    angular.module('cinkciarzTraining')
            .service('RandomCurrencyService', RandomCurrencyService);

})();
