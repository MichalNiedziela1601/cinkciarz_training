(function ()
{
    'use strict';

    function CurrenciesService($http, $q)
    {

        return {
            getCurrencies: function ()
            {
                var rates = [];

                var urls = [{url: 'https://api.nbp.pl/api/exchangerates/rates/c/usd/today/'}, {url: 'https://api.nbp.pl/api/exchangerates/rates/c/eur/today/'},
                    {url: 'https://api.nbp.pl/api/exchangerates/rates/c/gbp/today/'}];


                var promises = urls.map(function (url)
                {
                    return $http.get(url.url).then(function (rate)
                    {
                        var currency = {};
                        currency.code = rate.data.code;
                        currency.sell = rate.data.rates[0].bid;
                        currency.buy = rate.data.rates[0].ask;
                        currency.date = rate.data.rates[0].effectiveDate;
                        rates.push(currency);
                    });
                });

                return $q.all(promises).then(function ()
                {
                    return rates;
                });
            }
        };
    }

    angular.module('cinkciarzTraining').factory('CurrenciesService', CurrenciesService);


})();
