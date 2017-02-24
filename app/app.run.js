(function ()
{
    'use strict';

    angular.module('cinkciarzTraining')
            .run(function (CurrenciesService, $sessionStorage,amMoment)
            {
                amMoment.changeLocale('pl');
                function getCurrencies()
                {
                    CurrenciesService.getCurrencies()
                            .then(function (data)
                            {
                                $sessionStorage.rates = data;
                            })
                            .catch(function (error)
                            {
                                console.log(error);
                            });

                }

                getCurrencies();

            });

})();
