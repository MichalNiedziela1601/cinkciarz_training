/**
 * Created by student on 09.12.16.
 */
(function ()
{
    'use strict';
    angular.module('cinkciarzTraining')
            .controller('StartController', StartController)
            .controller('ModalController', ModalController);

    ////////////////////////
    function StartController($timeout, $localStorage, $location, $uibModal)
    {
        var vm = this;
        vm.startVal = undefined;
        if ($localStorage.wallet === undefined) {

            $timeout(function ()
            {
                vm.open();
            }, 300);
        } else {
            $location.path('/main');
        }

        vm.open = function ()
        {
            var modalInstance = $uibModal.open({
                animation: true, templateUrl: 'myModalContent.html', controller: 'ModalController', controllerAs: 'vm', backdrop: 'static'

            });

            modalInstance.result.then(function (startValue)
            {

                vm.startVal = parseInt(startValue, 10);
                $localStorage.$default({
                    wallet: {
                        PLN: vm.startVal ? vm.startVal : 0, EUR: 0, USD: 0, GBP: 0
                    }

                });
                $location.path('/main');
            }, function ()
            {
                $localStorage.$default({
                    wallet: {
                        PLN: vm.startVal ? vm.startVal : 0, EUR: 0, USD: 0, GBP: 0
                    }

                });
                $location.path('/main');
            });
        };

    }

    function ModalController($uibModalInstance, $timeout)
    {
        var vm = this;
        vm.divHide = true;
        vm.disabled = false;
        vm.message = '';


        vm.ok = function ()
        {
            if (vm.value === undefined) {
                validate('Zły format lub brak wartości');
            } else if (vm.value < 1) {
                validate('Ujemna lub zerowa wartość');
            }

            else {
                $uibModalInstance.close(vm.value);
            }
        };

        vm.cancel = function ()
        {
            $uibModalInstance.dismiss('cancel');
        };

        function validate(message)
        {
            vm.divHide = false;
            vm.message = message;
            $timeout(function ()
            {
                vm.divHide = true;
                vm.message = '';

            }, 3500);
        }

    }

})();
