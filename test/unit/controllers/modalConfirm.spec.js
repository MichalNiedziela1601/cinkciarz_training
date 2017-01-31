describe('ModalConfirmController', function ()
{
    'use strict';
    var ModalConfirmMock;
    var modalInstance;
    var localstorageMock;

    beforeEach(module('cinkciarzTraining'));
    beforeEach(inject(function ($controller, _$localStorage_)
    {
        modalInstance = {
            close: jasmine.createSpy('modalInstance.close'),
            dismiss: jasmine.createSpy('modalInstance.dismiss')
        };
        localstorageMock = _$localStorage_;
        localstorageMock.log = [ { message: 'test', date: '24.03.2016'}];
        ModalConfirmMock = $controller('ModalConfirmController', { $uibModalInstance: modalInstance, $localStorage: localstorageMock});
    }));

    describe('ok', function ()
    {
        beforeEach(function ()
        {
            ModalConfirmMock.ok();
        });
        it('should set log to empty', function ()
        {
            expect(localstorageMock.log).toBeEmptyArray();
        });
        it('should call close', function ()
        {
            expect(modalInstance.close).toHaveBeenCalled();
        });
    });

    describe('cancel', function ()
    {
        it('should call dismiss', function ()
        {
            ModalConfirmMock.cancel();
            expect(modalInstance.dismiss).toHaveBeenCalled();
        });
    });
});
