(function () {
    'use strict';

    function NavbarController($scope,$location,$sessionStorage, Auth, authManager,jwtHelper) {
        var ctrl = this;
        ctrl.navCollapsed = true;


        $scope.$on('$routeChangeStart', function(next, current) {
            if($sessionStorage.token) {
                ctrl.token = jwtHelper.decodeToken($sessionStorage.token);
            }
            ctrl.isAuthenticated = authManager.isAuthenticated();
        });
        function toggleCollapse() {
            ctrl.navCollapsed = !ctrl.navCollapsed;
        }

        function isActive(location) {
            var active = (location === $location.path());
            return active;
        }

        function checkPath() {
            return ($location.path() === '/register' || $location.path() === '/login');
        }

        function logout() {
            Auth.logout();
        }

        ctrl.toggleCollapse = toggleCollapse;
        ctrl.isActive = isActive;
        ctrl.checkPath = checkPath;
        ctrl.logout = logout;

    }

    angular.module('cinkciarzTraining')
        .controller('NavbarController', NavbarController);


})();
