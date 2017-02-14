describe('backButtonDirective', function ()
{
    'use strict';

    var backDirective;
    var locationMock;
    var controller;
    var scope;

    beforeEach(module('cinkciarzTraining'));

    beforeEach(inject(function (backButtonDirective)
    {
        backDirective = backButtonDirective[0];
    }));

    describe('controller', function ()
    {
        beforeEach(inject(function ($controller, _$location_, $rootScope)
        {
            locationMock = _$location_;
            scope = $rootScope.$new();
            controller = $controller(backDirective.controller, {$location: locationMock, $scope: scope});

        }));
        describe('backToMain', function ()
        {
            it('should location to main', function ()
            {
                spyOn(locationMock,'path');
                scope.backToMain();
                expect(locationMock.path).toHaveBeenCalledWith('/main');
            });
        });
    });
});
    
