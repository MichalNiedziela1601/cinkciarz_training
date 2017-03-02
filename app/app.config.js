(function () {
    'use strict';

    function config($routeProvider,$httpProvider,jwtOptionsProvider) {
        $routeProvider
                .when('/start',{
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
            .when('/login',{
                templateUrl : 'login/login.tpl.html',
                controller: 'LoginController',
                controllerAs : 'loginCtrl'
            })
                .otherwise({ redirectTo: '/login'});

        jwtOptionsProvider.config({
            whiteListedDomains: ['localhost'],
            tokenGetter: ['Auth',function(Auth){
                return Auth.getToken();
            }],
            unauthenticatedRedirectPath: '#/login'
        });

        $httpProvider.interceptors.push('jwtInterceptor');

    }

    angular
        .module('cinkciarzTraining')
        .config(config);


})();
