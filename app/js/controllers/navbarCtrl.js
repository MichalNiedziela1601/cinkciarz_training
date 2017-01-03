/**
 * Created by student on 13.12.16.
 */
(function(){
    'use strict';

    function NavbarController($location){
        var ctrl = this;
        ctrl.navCollapsed = true;

        function toggleCollapse(){
            ctrl.navCollapsed = !ctrl.navCollapsed;
        }

        function isActive(location){
            var active = (location === $location.path());
            return active;
        }

        ctrl.toggleCollapse = toggleCollapse;
        ctrl.isActive = isActive;

    }

    angular.module('cinkciarzTraining')
        .controller('NavbarController', NavbarController);


})();
