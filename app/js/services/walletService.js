/**
 * Created by sunday on 12/2/16.
 */
(function ()
{
    'use strict';

    function WalletService($localStorage)
    {

        this.getWallet = function ()
        {
            return $localStorage.wallet;
        };

        this.sell = function (code, rate, value)
        {
            $localStorage.wallet.PLN += (rate * value);
            $localStorage.wallet[code] -= value;
        };

        this.buy = function (code, rate, value)
        {
            $localStorage.wallet[code] += value;
            $localStorage.wallet.PLN -= (rate * value);
        };

        this.reset = function ()
        {
            $localStorage.$reset();
        };

    }


    angular.module('cinkciarzTraining')
            .service('WalletService', WalletService);


})();
