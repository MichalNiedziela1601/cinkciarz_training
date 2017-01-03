/**
 * Created by student on 09.12.16.
 */
(function ()
{
    'use strict';

    function StartController($localStorage, $location, $uibModal)
    {
        var ctrl = this;
        ctrl.startVal = undefined;


        ctrl.open = function ()
        {
            var modalInstance = $uibModal.open({
                animation: true, templateUrl: 'myModalContent.html', controller: 'ModalController', controllerAs: 'ctrl', backdrop: 'static',
                windowClass: 'app-modal-window'

            });

            modalInstance.result.then(function (startValue)
            {

                ctrl.startVal = parseInt(startValue, 10);
                $localStorage.$default({
                    wallet: {
                        PLN: ctrl.startVal ? ctrl.startVal : 0, EUR: 0, USD: 0, GBP: 0
                    }

                });
                $location.path('/main');
            }, function ()
            {
                $localStorage.$default({
                    wallet: {
                        PLN: ctrl.startVal ? ctrl.startVal : 0, EUR: 0, USD: 0, GBP: 0
                    }

                });
                $location.path('/main');
            });
        };

        if (null == $localStorage.wallet) {
            ctrl.open('sm');
        } else {
            $location.path('/main');
        }
    }

    function ModalController($uibModalInstance, $timeout)
    {
        var ctrl = this;
        ctrl.divHide = true;
        ctrl.disabled = false;
        ctrl.message = '';


        ctrl.ok = function ()
        {
            if (ctrl.value === undefined) {
                showErrorMessage('Zły format lub brak wartości');
            } else if (ctrl.value < 1) {
                showErrorMessage('Ujemna lub zerowa wartość');
            }

            else {
                $uibModalInstance.close(ctrl.value);
            }
        };

        ctrl.cancel = function ()
        {
            $uibModalInstance.dismiss('cancel');
        };

        function showErrorMessage(message)
        {
            ctrl.divHide = false;
            ctrl.message = message;
            $timeout(function ()
            {
                ctrl.divHide = true;
                ctrl.message = '';

            }, 3500);
        }

    }
    angular.module('cinkciarzTraining')
            .controller('StartController', StartController)
            .controller('ModalController', ModalController);

    ////////////////////////


})();
