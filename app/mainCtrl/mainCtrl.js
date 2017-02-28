(function ()
{
    'use strict';

    function MainCtrl($location, WalletService, $uibModal, RandomCurrencyService, $interval, $sessionStorage, RatesFactory, LogFactory)
    {
        var ctrl = this;
        ctrl.stop = null;
        ctrl.getWallet = function()
        {
            WalletService.getWallet().then(function (data)
            {
                ctrl.wallet = data;
            });
        };
        ctrl.rates = RatesFactory.getRates();
        ctrl.randomRates = [];
        ctrl.showArrows = false;
        ////////////////////////////////
        function reset()
        {
            ctrl.modalInstance = $uibModal.open({
                animation: true, templateUrl: 'mainCtrl/modalConfirm.html', controller: 'ModalConfirmController', controllerAs: 'ctrl', backdrop: 'static'

            });

            ctrl.modalInstance.result.then(function ()
            {

                WalletService.reset().then(function(){
                    LogFactory.empty().then(function(){
                        $location.path('/');
                    });
                });
            });
        }

        function checkCurrencyWallet(code)
        {

            if (null == ctrl.wallet) {

                return false;
            } else {
                return ctrl.wallet[code] <= 0;

            }
        }


        function setRandomRates()
        {
            ctrl.stop = $interval(function ()
            {
                RandomCurrencyService.setRandomRates();
                ctrl.getRandomRates();
                ctrl.showArrows = true;
            }, 5000);

        }

        ctrl.getRandomRates = function ()
        {
            ctrl.rates = RandomCurrencyService.getRandomRates();

        };

        ctrl.isRandom = function()
        {
            return $sessionStorage.isRandom;
        };

        function stopRandom()
        {

            $interval.cancel(ctrl.stop);
            ctrl.showArrows = false;
        }

        function checkRandom()
        {
            if (ctrl.isRandom()) {
                setRandomRates();
            } else {
                stopRandom();
            }
        }

        function toggleRandomRates()
        {
            $sessionStorage.isRandom = !$sessionStorage.isRandom;
            checkRandom();
        }

        function showLog()
        {
            ctrl.logs = LogFactory.getLog();
        }

        ctrl.diffBuy = function (code, buy)
        {
            var oldRate = findRate(code);
            return buy > oldRate.buy;
        };

        ctrl.diffSell = function (code, sell)
        {
            var oldRate = findRate(code);
            return sell > oldRate.sell;
        };

        function findRate(code)
        {
            var old = RatesFactory.getOldRates();
            if (0 === old.length) {
                return;
            }
            for (var i = 0; i < old.length; i++) {

                if (old[i].code === code) {
                    return old[i];
                }
            }
        }

        function getLog(){
            LogFactory.getLog().then(function (result) {
                ctrl.logs = result;
            });
        }

        ///////////////////////////////
        getLog();
        ctrl.getWallet();
        ctrl.showLog = showLog;
        checkRandom();
        ctrl.showLog();
        ctrl.reset = reset;
        ctrl.checkCurrencyWallet = checkCurrencyWallet;
        ctrl.toggleRandomRates = toggleRandomRates;
        ctrl.stopRandom = stopRandom;


        //////////////////////


    }

    angular.module('cinkciarzTraining').controller('MainCtrl', MainCtrl);

})();
