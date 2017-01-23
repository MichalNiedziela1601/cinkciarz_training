describe('InfoController', function ()
{
    'use strict';

    var infoCtrl;

    beforeEach(module('cinkciarzTraining'));
    beforeEach(inject(function($controller){
        infoCtrl = $controller('InfoController');
    }));

    describe('initialization', function ()
    {
        it('should status be defined', function ()
        {
            expect(infoCtrl.status).toBeDefined();
        });
        it('should status.isFirstOpen to be true', function ()
        {
            expect(infoCtrl.status.isFirstOpen).toBeTruthy();
        });
        it('should status.isFirstDisabled to be false', function ()
        {
            expect(infoCtrl.status.isFirstDisabled).toBeFalsy();
        });
    });
});
