/**
 * Created by sunday on 12/1/16.
 */
(function () {
    angular
        .module('cinkciarzTraining')
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when("/", {
            templateUrl: "../templates/main.html",
            controller: "MainCtrl",
            controllerAs: 'vm'
        })
            .otherwise({ redirecTo: '/'});
    }
})();