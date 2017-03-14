(function ()
{
    'use strict';

    function InfoController()
    {
        var ctrl = this;

        ctrl.status = {
            isFirstOpen: true, isFirstDisabled: false
        };
    }

    angular.module('cinkciarzTraining')
            .controller('InfoController', InfoController);


})();
