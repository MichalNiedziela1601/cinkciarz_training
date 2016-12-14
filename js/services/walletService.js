/**
 * Created by sunday on 12/2/16.
 */
(function ()
{
    'use strict';
    angular.module('cinkciarzTraining')
            .service('WalletService', WalletService);

    function WalletService($localStorage, $window)
    {

        this.getWallet = function ()
        {
            return $localStorage.wallet;
        };

        this.buy = function (code, rate, value)
        {
            $localStorage.wallet.PLN += (rate * value);
            $localStorage.wallet[code] -= value;
        };

        this.sell = function (code, rate, value)
        {
            $localStorage.wallet[code] += value;
            $localStorage.wallet.PLN -= (rate * value);
        };

        this.reset = function ()
        {
            $localStorage.$reset();
            $window.location.reload();
        };

    }

})();
