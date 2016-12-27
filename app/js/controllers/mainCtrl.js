/**
 * Created by sunday on 12/1/16.
 */

(function ()
{
    'use strict';
    function MainCtrl($location, WalletService, $localStorage, CurrenciesService, $uibModal, RandomCurrencyService, $interval, $sessionStorage, RatesFactory,
                      LogFactory)
    {
        var ctrl = this;
        ctrl.wallet = WalletService.getWallet();
        ctrl.rates = RatesFactory.getRates();

        ctrl.randomRates = [];
        var stop;
        ctrl.logs = LogFactory.getLog();


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
            return $localStorage.wallet[code] <= 0;
        }


        function getCurrencies()
        {
            CurrenciesService.getCurrencies()
                    .then(function (data)
                    {
                        $sessionStorage.rates = data;
                        ctrl.rates = RatesFactory.getRates();
                    })
                    .catch(function (error)
                    {
                        console.log(error);
                    });

        }

        function setRandomRates()
        {
            stop = $interval(function ()
            {
                RandomCurrencyService.setRandomRates();
                getRandomRates();
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
            if (null == oldRate) {
                return;
            }
            return buy > oldRate.buy;
        };

        function findRate(code)
        {
            var old = RatesFactory.getOldRates();
            if (old.length === 0) {
                return;
            }
            for (var i = 0; i < old.length; i++) {

                if (old[i].code === code) {
                    return old[i];
                }
            }
        }

        ///////////////////////////////
        getCurrencies();
        showLog();
        checkRandom();
        ctrl.reset = reset;
        ctrl.checkCurrencyWallet = checkCurrencyWallet;
        ctrl.toggleRandomRates = toggleRandomRates;
        ctrl.isRandom = isRandom;
        ctrl.stopRandom = stopRandom;

        //////////////////////

        if (null == $sessionStorage.rates) {
            getCurrencies();
        }

    }

    angular.module('cinkciarzTraining')
            .controller('MainCtrl', MainCtrl);

})();
