/**
 * Created by student on 19.12.16.
 */
(function ()
{
    'use strict';
    function RatesFactory($sessionStorage, CurrenciesService)
    {
        function Rates()
        {
            var ctrl = this;
            ctrl.rates = $sessionStorage.rates;
            ctrl.oldRates = [];


            function getCurrencies()
            {
                CurrenciesService.getCurrencies()
                        .then(function (data)
                        {
                            $sessionStorage.rates = data;
                            ctrl.rates = angular.copy($sessionStorage.rates);
                        })
                        .catch(function (error)
                        {
                            console.log(error);
                        });

            }

            getCurrencies();

            ctrl.addRates = function (rates)
            {
                angular.copy(ctrl.rates,ctrl.oldRates);
                ctrl.rates = angular.copy(rates);
            };


            ctrl.getRates = function ()
            {
                return ctrl.rates;
            };

            ctrl.getOldRates = function ()
            {
                return ctrl.oldRates;
            };





        }

        return new Rates();
    }

    angular.module('cinkciarzTraining')
            .factory('RatesFactory', RatesFactory);

})();
