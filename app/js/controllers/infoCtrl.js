/**
 * Created by sunday on 12/2/16.
 */
(function ()
{
    'use strict';
    angular.module('cinkciarzTraining')
            .controller('InfoController', InfoController);

    ///////////////////
    function InfoController()
    {
        var vm = this;

        vm.status = {
            isFirstOpen: true, isFirstDisabled: false
        };
    }
})();
