(function () {
    'use strict';

    function config($routeProvider) {
        $routeProvider
                .when('/',{
                    templateUrl: 'views/start.html',
                    controller: 'StartController',
                    controllerAs: 'startCtrl'
                })
                .when('/main', {
                    templateUrl: 'views/main.html',
                    controller: 'MainCtrl',
                    controllerAs: 'mainCtrl'
                })
                .when('/info', {
                    templateUrl: 'views/info.html',
                    controller: 'InfoController',
                    controllerAs: 'infoCtrl'
                })
                .when('/buy/:currency', {
                    templateUrl: 'views/buy.html',
                    controller: 'BuyController',
                    controllerAs: 'buyCtrl'
                })
                .when('/sell/:currency',{
                    templateUrl: 'views/sell.html',
                    controller: 'SellController',
                    controllerAs: 'sellCtrl'
                })
                .otherwise({ redirectTo: '/'});

    }

    angular
        .module('cinkciarzTraining')
        .config(config);


})();
