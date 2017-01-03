/**
 * Created by sunday on 12/6/16.
 */
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

                var urlsCalls = [];
                angular.forEach(urls, function (url)
                {
                    urlsCalls.push($http.get(url.url));
                });
                return $q.all(urlsCalls)
                        .then(function (result)
                        {
                            angular.forEach(result, function (rate)
                            {
                                var currency = {};
                                currency.code = rate.data.code;
                                currency.sell = rate.data.rates[0].bid;
                                currency.buy = rate.data.rates[0].ask;
                                currency.date = rate.data.rates[0].effectiveDate;
                                rates.push(currency);
                            });
                            return rates;
                        });
            }
        };
    }

    angular.module('cinkciarzTraining').factory('CurrenciesService', CurrenciesService);


})();
