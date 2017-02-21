(function ()
{
    'use strict';

    function WalletService($localStorage, $http, LogFactory)
    {
        var url = 'http://localhost:3000/api/wallet';
        this.getWallet = function ()
        {
            return $http.get(url).then(function(response){
                return response.data;
            });
        };

        this.setStartValue = function(value){
            return $http.post(url, { PLN: value, GBP: 0, EUR: 0, USD: 0}).then(function(data){
                return data;
            });
        };

        this.sell = function (wallet,code, rate, value)
        {
            wallet.PLN += (rate * value);
            wallet[code] -= value;

            LogFactory.addLog('Sprzedałeś ' + value + ' ' + code + ' zyskując ' + (rate * value).toFixed(2) + ' zł');
            return $http.post(url, wallet).then(function(response){
                return response.data;
            });
        };

        this.buy = function (wallet,code, rate, value)
        {
            wallet[code] += value;
            wallet.PLN -= (rate * value);
            LogFactory.addLog('Kupiłeś ' + value + ' ' + code + ' za ' + (rate * value).toFixed(2) + ' zł');
            return $http.post(url, wallet).then(function(response){
                return response.data;
            });
        };

        this.reset = function ()
        {
            return $http.delete(url).then(function(){
            });
        };

    }


    angular.module('cinkciarzTraining')
            .service('WalletService', WalletService);


})();
