/**
 * Created by sunday on 12/2/16.
 */
(function ()
{
    'use strict';

    function WalletService($localStorage, LogFactory)
    {
        this.getWallet = function ()
        {
            return $localStorage.wallet;
        };

        this.sell = function (code, rate, value)
        {
            $localStorage.wallet.PLN += (rate * value);
            $localStorage.wallet[code] -= value;
            LogFactory.addLog('Sprzedałeś ' + value + ' ' + code + ' zyskując ' + (rate * value).toFixed(2) + ' zł');
        };

        this.buy = function (code, rate, value)
        {
            $localStorage.wallet[code] += value;
            $localStorage.wallet.PLN -= (rate * value);
            LogFactory.addLog('Kupiłeś ' + value + ' ' + code + ' za ' + (rate * value).toFixed(2) + ' zł');
        };

        this.reset = function ()
        {
            $localStorage.$reset();
        };

    }


    angular.module('cinkciarzTraining')
            .service('WalletService', WalletService);


})();
