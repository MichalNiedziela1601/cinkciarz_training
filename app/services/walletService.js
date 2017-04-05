(function ()
{
    'use strict';

    function WalletService($http, LogFactory, lodash)
    {
        var url = 'http://localhost:3000/api/wallet';
        this.getWallet = function ()
        {
            return $http.get(url).then(function(response){

                if(lodash.isEmpty(response.data) || lodash.isEqual(response.data,[{ pln: 0, eur: 0, gbp: 0, usd: 0 }])) {
                    return [];

                }else {
                    var wallet = {
                        PLN: response.data[0].pln,
                        EUR: response.data[0].eur,
                        GBP: response.data[0].gbp,
                        USD: response.data[0].usd
                    };
                    return wallet;
                }

            })
                .catch(function(error){
                    return error;
                });
        };

        this.setStartValue = function(value){
            var wallet =  { PLN: value, GBP: 0, EUR: 0, USD: 0};
            return $http.post(url,wallet).then(function(){
                return true;
            }).catch(function(error){
                return error;
            });
        };

        this.sell = function (wallet,code, rate, value)
        {
            wallet.PLN += (rate * value);
            wallet[code] -= value;

            LogFactory.addLog('Sprzedałeś ' + value + ' ' + code + ' zyskując ' + (rate * value).toFixed(2) + ' zł');
            return $http.put(url, wallet).then(function(response){
                return response.data;
            });
        };

        this.buy = function (wallet,code, rate, value)
        {
            wallet[code] += value;
            wallet.PLN -= (rate * value);
            LogFactory.addLog('Kupiłeś ' + value + ' ' + code + ' za ' + (rate * value).toFixed(2) + ' zł');
            return $http.put(url, wallet).then(function(response){
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
