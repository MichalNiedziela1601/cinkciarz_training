/**
 * Created by student on 23.12.16.
 */
(function ()
{
    'use strict';

    angular.module('cinkciarzTraining')
            .run(function (CurrenciesService, $sessionStorage)
            {
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
