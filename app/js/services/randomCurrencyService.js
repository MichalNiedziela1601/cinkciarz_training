(function ()
{
    'use strict';

    function RandomCurrencyService(RatesFactory, CurrenciesService)
    {
        var ctrl = this;
        this.randomRates = RatesFactory.getRates();
        this.getOrginalRates = function(){
            CurrenciesService.getCurrencies()
                    .then(function (data)
                    {
                        ctrl.orginalRates = data;
                    })
                    .catch(function (error)
                    {
                        console.log('Error occured', error);
                    });
        };
        this.getOrginalRates();



        this.randomValue = function ()
        {
            return (Math.random()).toFixed(2);
        };


        this.operations = function (currency, operation)
        {
            currency = parseFloat(currency);
            var value = parseFloat(this.randomValue()).toFixed(2);
            switch (operation) {
                case '-' :
                    currency -= currency * value / 100;
                    break;
                case '+' :
                    currency += currency * value / 100;
                    break;
            }

            currency = currency.toFixed(4);
            return currency;
        };

        this.randomOperations = function (currency)
        {
            var random = Math.floor(Math.random() * 2);
            var value = 0;
            if (0 === random) {
                value = this.operations(currency, '-');
            } else {
                value = this.operations(currency, '+');
            }
            return value;
        };

        this.setRandomRates = function ()
        {

            for (var i = 0; i < this.orginalRates.length; i++) {
                var randomBuy = parseFloat(this.randomOperations(this.orginalRates[i].buy));
                this.randomRates[i].buy = randomBuy;
                while (this.isDiffrentToBig(this.orginalRates[i].buy, randomBuy)) {
                    this.randomRates[i].buy = parseFloat(this.randomOperations(this.orginalRates[i].buy));
                }
                var randomSell = parseFloat(this.randomOperations(this.orginalRates[i].sell));
                this.randomRates[i].sell = randomSell;
                while (this.isDiffrentToBig(this.orginalRates[i].sell, randomSell)) {
                    this.randomRates[i].sell = parseFloat(this.randomOperations(this.orginalRates[i].sell));
                }
            }
            RatesFactory.addRates(this.randomRates);
        };

        this.isDiffrentToBig = function (original, random)
        {
            return this.mathDiff(original, random) > 5;
        };

        this.mathDiff = function (original, random)
        {
            return Math.abs(((original - random) / original) * 100);
        };


        this.getRandomRates = function ()
        {
            return this.randomRates;
        };


    }

    angular.module('cinkciarzTraining')
            .service('RandomCurrencyService', RandomCurrencyService);

})();
