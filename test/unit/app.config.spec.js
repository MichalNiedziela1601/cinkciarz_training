describe('app.config.js', function ()
{
    'use strict';

    var route;

    beforeEach(function ()
    {
        module('cinkciarzTraining');
        inject(function ($route)
        {
            route = $route;
        });
    });
    describe('/', function ()
    {
        it('should has \'StartController\'', function ()
        {
            expect(route.routes['/'].controller).toBe('StartController');
        });
        it('should has \'views/start.html\' template', function ()
        {
            expect(route.routes['/'].templateUrl).toBe('views/start.html');
        });
        it('should has \'startCtrl\' shortcut', function ()
        {
            expect(route.routes['/'].controllerAs).toBe('startCtrl');
        });

    });
    describe('/main', function ()
    {
        it('should has \'MainCtrl\'', function ()
        {
            expect(route.routes['/main'].controller).toBe('MainCtrl');
        });
        it('should has \'views/main.html\' template', function ()
        {
            expect(route.routes['/main'].templateUrl).toBe('views/main.html');
        });
        it('should has \'mainCtrl\' shortcut', function ()
        {
            expect(route.routes['/main'].controllerAs).toBe('mainCtrl');
        });

    });
    describe('/info', function ()
    {
        it('should has \'InfoController\'', function ()
        {
            expect(route.routes['/info'].controller).toBe('InfoController');
        });
        it('should has \'views/info.html\' template', function ()
        {
            expect(route.routes['/info'].templateUrl).toBe('views/info.html');
        });
        it('should has \'infoCtrl\' shortcut', function ()
        {
            expect(route.routes['/info'].controllerAs).toBe('infoCtrl');
        });

    });
    describe('/buy', function ()
    {
        it('should has \'BuyController\'', function ()
        {
            expect(route.routes['/buy/:currency'].controller).toBe('BuyController');
        });
        it('should has \'views/buy.html\' template', function ()
        {
            expect(route.routes['/buy/:currency'].templateUrl).toBe('views/buy.html');
        });
        it('should has \'buyCtrl\' shortcut', function ()
        {
            expect(route.routes['/buy/:currency'].controllerAs).toBe('buyCtrl');
        });
        it('should has \'currency\' path variable', function ()
        {
            expect(route.routes['/buy/:currency'].keys[0].name).toBe('currency');
        });

    });
    describe('/sell', function ()
    {
        it('should has \'SellController\'', function ()
        {
            expect(route.routes['/sell/:currency'].controller).toBe('SellController');
        });
        it('should has \'views/sell.html\' template', function ()
        {
            expect(route.routes['/sell/:currency'].templateUrl).toBe('views/sell.html');
        });
        it('should has \'sellCtrl\' shortcut', function ()
        {
            expect(route.routes['/sell/:currency'].controllerAs).toBe('sellCtrl');
        });
        it('should has \'currency\' path variable', function ()
        {
            expect(route.routes['/sell/:currency'].keys[0].name).toBe('currency');
        });

    });


});
