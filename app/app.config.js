(function () {
    'use strict';

    function config($routeProvider) {
        $routeProvider
                .when('/',{
                    templateUrl: 'startCtrl/start.html',
                    controller: 'StartController',
                    controllerAs: 'startCtrl'
                })
                .when('/main', {
                    templateUrl: 'mainCtrl/main.html',
                    controller: 'MainCtrl',
                    controllerAs: 'mainCtrl'
                })
                .when('/info', {
                    templateUrl: 'info/info.html',
                    controller: 'InfoController',
                    controllerAs: 'infoCtrl'
                })
                .when('/buy/:currency', {
                    templateUrl: 'buyCtrl/buy.html',
                    controller: 'BuyController',
                    controllerAs: 'buyCtrl'
                })
                .when('/sell/:currency',{
                    templateUrl: 'sellCtrl/sell.html',
                    controller: 'SellController',
                    controllerAs: 'sellCtrl'
                })
            .when('/register', {
                templateUrl: 'register/register.tpl.html',
                controller: 'RegisterController',
                controllerAs: 'registerCtrl'
            })
                .otherwise({ redirectTo: '/'});

    }

    angular
        .module('cinkciarzTraining')
        .config(config);


})();
