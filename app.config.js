/**
 * Created by sunday on 12/1/16.
 */
(function () {
    'use strict';
    angular
        .module('cinkciarzTraining')
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl: 'templates/start.html',
                controller: 'StartController',
                controllerAs: 'vm'
            })
            .when('/main', {
            templateUrl: 'templates/main.html',
            controller: 'MainCtrl',
            controllerAs: 'vm'
        })
            .when('/info', {
            templateUrl: 'templates/info.html',
            controller: 'InfoController',
            controllerAs: 'vm'
        })
            .when('/buy/:currency', {
                templateUrl: 'templates/buy.html',
                controller: 'BuyController',
                controllerAs: 'vm'
            })
            .when('/sell/:currency',{
                templateUrl: 'templates/sell.html',
                controller: 'SellController',
                controllerAs: 'vm'
            })
            .otherwise({ redirectTo: '/'});

    }
})();
