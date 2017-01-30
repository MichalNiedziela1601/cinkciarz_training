(function ()
{
    'use strict';

    function MainCtrl($location, WalletService, $localStorage, $uibModal, RandomCurrencyService, $interval, $sessionStorage, RatesFactory,
                      LogFactory)

    {
        var ctrl = this;
        ctrl.stop = null;
        ctrl.wallet = WalletService.getWallet();
        ctrl.rates = RatesFactory.getRates();
        ctrl.randomRates = [];
        ctrl.logs = LogFactory.getLog();
        ctrl.showArrows = false;

        ////////////////////////////////
        ctrl.reset = function()
        {
            ctrl.modalInstance = $uibModal.open({
                animation: true, templateUrl: 'myModalConfirm.html', controller: 'ModalConfirmController', controllerAs: 'ctrl', backdrop: 'static'

            });

            ctrl.modalInstance.result.then(function ()
            {
                $location.path('/');
                LogFactory.empty();
                WalletService.reset();
            });
        };

        ctrl.checkCurrencyWallet = function(code)
        {

            if(null == $localStorage.wallet){

                return false;
            }else{
                return $localStorage.wallet[code] <= 0;

            }
        };


        ctrl.setRandomRates = function()
        {

            ctrl.stop = $interval(function ()
            {
                console.log('setRandom');
                RandomCurrencyService.setRandomRates();
                ctrl.getRandomRates();
                ctrl.showArrows = true;
            }, 5000);

        };

        ctrl.getRandomRates = function()
        {
            ctrl.rates = RandomCurrencyService.getRandomRates();

        };

        ctrl.isRandom = function isRandom()
        {
            return $sessionStorage.isRandom;
        };

        ctrl.stopRandom = function()
        {
            $interval.cancel(ctrl.stop);
            ctrl.showArrows = false;
        };

        ctrl.checkRandom = function()
        {
            if (ctrl.isRandom()) {
                ctrl.setRandomRates();
            } else {
                ctrl.stopRandom();
            }
        };

        ctrl.toggleRandomRates = function()
        {
            $sessionStorage.isRandom = !$sessionStorage.isRandom;
            ctrl.checkRandom();
        };

        ctrl.showLog = function()
        {
            ctrl.logs = LogFactory.getLog();
        };

        ctrl.diffBuy = function (code, buy)
        {
            var oldRate = ctrl.findRate(code);
            return buy > oldRate.buy;
        };

        ctrl.diffSell = function (code, sell)
        {
            var oldRate = ctrl.findRate(code);
            return sell > oldRate.sell;
        };

        ctrl.findRate = function(code)
        {
            ctrl.old = RatesFactory.getOldRates();
            if (0 === ctrl.old.length) {
                return;
            }
            for (var i = 0; i < ctrl.old.length; i++) {

                if (ctrl.old[i].code === code) {
                    return ctrl.old[i];
                }
            }
        };

        ///////////////////////////////
        ctrl.checkRandom();


    }

    angular.module('cinkciarzTraining').controller('MainCtrl', MainCtrl);

})();
