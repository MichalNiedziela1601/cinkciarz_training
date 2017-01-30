(function ()
{
    'use strict';

    function StartController($localStorage, $location, $uibModal, $sessionStorage)
    {
        var ctrl = this;
        $sessionStorage.isRandom = false;

        ctrl.open = function ()
        {
            ctrl.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                controller: 'ModalController',
                controllerAs: 'startModal',
                backdrop: 'static',
                windowClass: 'app-modal-window'

            });

            ctrl.modalInstance.result.then(function (startValue)
            {

                ctrl.startVal = parseInt(startValue, 10);
                $localStorage.$default({
                    wallet: {
                        PLN: ctrl.startVal ? ctrl.startVal : 0, EUR: 0, USD: 0, GBP: 0
                    }, log: []

                });
                $location.path('/main');
            });
        };

        ctrl.checkStorage = function()
        {
            if (null == $localStorage.wallet) {
                ctrl.open('sm');
            } else {
                $location.path('/main');
            }
        };
        ctrl.checkStorage();
    }



    angular.module('cinkciarzTraining')
            .controller('StartController', StartController);

    ////////////////////////


})();
