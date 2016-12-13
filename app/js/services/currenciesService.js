/**
 * Created by sunday on 12/6/16.
 */
(function ()
{
    'use strict';
    angular.module('cinkciarzTraining').factory('CurrenciesService', CurrenciesService);

    function CurrenciesService($http, $q)
    {

        return {
            getCurrencies: function ()
            {
                var deffered = $q.defer();
                var urls = [{url: 'https://api.nbp.pl/api/exchangerates/rates/c/usd/today/'}, {url: 'https://api.nbp.pl/api/exchangerates/rates/c/eur/today/'},
                    {url: 'https://api.nbp.pl/api/exchangerates/rates/c/gbp/today/'}];

                var urlsCalls = [];
                angular.forEach(urls, function (url)
                {
                    urlsCalls.push($http.get(url.url));
                });
                $q.all(urlsCalls)
                        .then(function (result)
                        {
                            deffered.resolve(result);
                        }, function (error)
                        {
                            deffered.reject(error);
                        });

                return deffered.promise;
            }

        };
    }

})();
