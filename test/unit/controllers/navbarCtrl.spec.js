describe('NavbarController', function ()
{
    'use strict';
    var NavbarMock;
    var locationMock;

    beforeEach(module('cinkciarzTraining'));
    beforeEach(inject(function($controller, _$location_){
        locationMock = _$location_;



        NavbarMock = $controller('NavbarController', { $location: locationMock});
    }));

    describe('initialization', function ()
    {
        it('should set navCollapse', function ()
        {
            expect(NavbarMock.navCollapsed).toBe(true);
        });
    });

    describe('toggleCollapse', function ()
    {
        beforeEach(function ()
        {
            NavbarMock.toggleCollapse();
        });
        it('should toggle navCollapse', function ()
        {
            expect(NavbarMock.navCollapsed).toBe(false);
        });
    });

    describe('isActive', function ()
    {
        beforeEach(function ()
        {
            spyOn(locationMock, 'path').and.callFake(function(){
                return '/main';
            });

        });
        it('should return true if path is the same as location', function ()
        {
            expect(NavbarMock.isActive('/main')).toBe(true);
        });
        it('should return false if path is not the same as location', function ()
        {
            expect(NavbarMock.isActive('/info')).toBe(false);
        });
    });
});
