(function ()
{
    'use strict';

    function NavbarController($location)
    {
        var ctrl = this;
        ctrl.navCollapsed = true;

        function toggleCollapse()
        {
            ctrl.navCollapsed = !ctrl.navCollapsed;
        }

        function isActive(location)
        {
            var active = (location === $location.path());
            return active;
        }

        function checkPath(){
            return $location.path() === '/register';
        }

        ctrl.toggleCollapse = toggleCollapse;
        ctrl.isActive = isActive;
        ctrl.checkPath = checkPath;

    }

    angular.module('cinkciarzTraining')
            .controller('NavbarController', NavbarController);


})();
