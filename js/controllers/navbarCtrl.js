/**
 * Created by student on 13.12.16.
 */
(function(){
    'use strict';

    function NavbarController($location){
        var vm = this;
        vm.navCollapsed = true;

        function toggleCollapse(){
            vm.navCollapsed = !vm.navCollapsed;
        }

        function isActive(location){
            var active = (location === $location.path());
            return active;
        }

        vm.toggleCollapse = toggleCollapse;
        vm.isActive = isActive;

    }

    angular.module('cinkciarzTraining')
        .controller('NavbarController', NavbarController);


})();
