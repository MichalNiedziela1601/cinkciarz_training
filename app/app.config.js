/**
 * Created by sunday on 12/1/16.
 */
(function () {
    'use strict';

    function config($routeProvider) {
        $routeProvider
                .when('/',{
                    templateUrl: 'templates/start.html',
                    controller: 'StartController',
                    controllerAs: 'startCtrl'
                })
                .when('/main', {
                    templateUrl: 'templates/main.html',
                    controller: 'MainCtrl',
                    controllerAs: 'mainCtrl'
                })
                .when('/info', {
                    templateUrl: 'templates/info.html',
                    controller: 'InfoController',
                    controllerAs: 'infoCtrl'
                })
                .when('/buy/:currency', {
                    templateUrl: 'templates/buy.html',
                    controller: 'BuyController',
                    controllerAs: 'buyCtrl'
                })
                .when('/sell/:currency',{
                    templateUrl: 'templates/sell.html',
                    controller: 'SellController',
                    controllerAs: 'sellCtrl'
                })
                .otherwise({ redirectTo: '/'});

    }

    angular
        .module('cinkciarzTraining')
        .config(config);


})();
