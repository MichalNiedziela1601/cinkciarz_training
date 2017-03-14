(function ()
{
    'use strict';
    function RatesFactory($sessionStorage)
    {
        function Rates()
        {

            this.rates = angular.copy($sessionStorage.rates);
            this.oldRates = [];

            this.addRates = function (rates)
            {
                this.oldRates = angular.copy(this.rates);
                this.rates = angular.copy(rates);
            };


            this.getRates = function ()
            {
                return this.rates;
            };

            this.getOldRates = function ()
            {
                return this.oldRates;
            };

        }

        return new Rates();
    }

    angular.module('cinkciarzTraining')
            .factory('RatesFactory', RatesFactory);

})();
