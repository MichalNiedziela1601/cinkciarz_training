(function ()
{
    'use strict';

    function MainCtrl($location, WalletService, $localStorage, $uibModal, RandomCurrencyService, $interval, $sessionStorage, RatesFactory,
                      LogFactory)

    {
        var ctrl = this;
        var stop;
        ctrl.wallet = WalletService.getWallet();
        ctrl.rates = RatesFactory.getRates();
        ctrl.randomRates = [];
        ctrl.logs = LogFactory.getLog();
        ctrl.showArrows = false;

        ////////////////////////////////
        function reset()
        {
            var modalInstance = $uibModal.open({
                animation: true, templateUrl: 'myModalConfirm.html', controller: 'ModalConfirmController', controllerAs: 'ctrl', backdrop: 'static'

            });

            modalInstance.result.then(function ()
            {
                $location.path('/');
                LogFactory.empty();
                WalletService.reset();
            });
        }

        function checkCurrencyWallet(code)
        {

            if(null == $localStorage.wallet){

                return true;
            }
            return $localStorage.wallet[code] <= 0;
        }





        function setRandomRates()
        {
            stop = $interval(function ()
            {
                RandomCurrencyService.setRandomRates();
                getRandomRates();
                ctrl.showArrows = true;
            }, 5000);

        }

        function getRandomRates()
        {
            ctrl.rates = RandomCurrencyService.getRandomRates();

        }

        function isRandom()
        {
            return $sessionStorage.isRandom;
        }

        function stopRandom()
        {
            $interval.cancel(stop);
            ctrl.showArrows = false;
        }

        function checkRandom()
        {
            if (isRandom()) {
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

        ///////////////////////////////
        ctrl.showLog = showLog;
        ctrl.checkRandom = checkRandom();
        ctrl.reset = reset;
        ctrl.checkCurrencyWallet = checkCurrencyWallet;
        ctrl.toggleRandomRates = toggleRandomRates;
        ctrl.isRandom = isRandom;
        ctrl.stopRandom = stopRandom;

        //////////////////////


    }

    angular.module('cinkciarzTraining').controller('MainCtrl', MainCtrl);

})();
