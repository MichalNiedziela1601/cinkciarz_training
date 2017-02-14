describe('ModalController', function ()
{
    'use strict';
    var ModalCtrlMock;
    var modalInstance;
    var timeoutMock;
    var messageMock;

    beforeEach(module('cinkciarzTraining', function ($provide)
    {
        $provide.value('CurrenciesService', {
            getCurrencies: jasmine.createSpy('getCurrencies').and.callFake(function ()
            {
                return successfulPromise([]);
            })
        });
    }));
    beforeEach(inject(function($controller, _$timeout_){
        modalInstance = {
            close: jasmine.createSpy('modalInstance.close'),
            dismiss: jasmine.createSpy('modalInstance.dismiss'),
            result: {
                then: jasmine.createSpy('modalInstance.result.then')
            }
        };
        timeoutMock = _$timeout_;

        ModalCtrlMock = $controller('ModalController', {$uibModalInstance: modalInstance, $timeout: timeoutMock});
    }));

    describe('initialization', function ()
    {
        it('should set divHide to true', function ()
        {
            expect(ModalCtrlMock.divHide).toBe(true);
        });
        it('should set disabled', function ()
        {
            expect(ModalCtrlMock.disabled).toBe(false);
        });
        it('should set message', function ()
        {
            expect(ModalCtrlMock.message).toBe('');
        });
    });

    describe('ok', function ()
    {
        describe('when value is undefined', function ()
        {
            
            beforeEach(function ()
            {
                messageMock = 'Nie wpisałeś wartości';
                ModalCtrlMock.value = undefined;
                ModalCtrlMock.ok();
            });
            it('should set divHide', function ()
            {
                expect(ModalCtrlMock.divHide).toBe(false);
            });
            it('should set message', function ()
            {
                expect(ModalCtrlMock.message).toEqual(messageMock);
            });
            it('should set default values after timeout', function ()
            {
                timeoutMock.flush();
                expect(ModalCtrlMock.divHide).toBe(true);
                expect(ModalCtrlMock.message).toBe('');
            });

        });
        describe('when value is lower then 1', function ()
        {

            beforeEach(function ()
            {
                messageMock = 'Wpisałeś ujemną lub zerową wartość';
                ModalCtrlMock.value = 0;
                ModalCtrlMock.ok();
            });
            it('should set divHide', function ()
            {
                expect(ModalCtrlMock.divHide).toBe(false);
            });
            it('should set message', function ()
            {
                expect(ModalCtrlMock.message).toEqual(messageMock);
            });
            it('should set default values after timeout', function ()
            {
                timeoutMock.flush();
                expect(ModalCtrlMock.divHide).toBe(true);
                expect(ModalCtrlMock.message).toBe('');
            });

        });

        describe('when value is correct', function ()
        {
            beforeEach(function ()
            {
                ModalCtrlMock.value = 1000;
                ModalCtrlMock.ok();
            });
            it('should call close', function ()
            {
                expect(modalInstance.close).toHaveBeenCalledWith(ModalCtrlMock.value);
            });
        });
    });

    describe('cancel', function ()
    {
        it('should call dismiss', function ()
        {
            ModalCtrlMock.cancel();
            expect(modalInstance.dismiss).toHaveBeenCalled();
        });
    });

});
