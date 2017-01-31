describe('StartCtrl', function ()
{
    'use strict';

    var startCtrl;
    var $localStorageMock;
    var $locationMock;
    var $uibModalMock;
    var $sessionStorageMock;
    var CurrenciesServiceMock;
    var modalResult;


    beforeEach(module('cinkciarzTraining'));

    beforeEach(inject(function ($controller, _$localStorage_, _$location_, _$sessionStorage_, CurrenciesService)
    {
        $localStorageMock = _$localStorage_;
        $locationMock = _$location_;
        $sessionStorageMock = _$sessionStorage_;
        CurrenciesServiceMock = CurrenciesService;

        modalResult = {
            then: function (callback)
            {
                callback(1000); // passing fake value as result
            }
        };

        $uibModalMock = {
            open: function ()
            {}
        };

        spyOn($uibModalMock, 'open').and.returnValue({result: modalResult});


        startCtrl = $controller('StartController', {
            $localStorage: $localStorageMock,
            $location: $locationMock,
            $uibModal: $uibModalMock,
            $sessionStorage: $sessionStorageMock,
            CurrenciesService: CurrenciesServiceMock
        });
        spyOn(startCtrl, 'checkStorage').and.callThrough();
        spyOn(startCtrl, 'open');

    }));
    afterEach(function ()
    {
        $localStorageMock.$reset();
    });


    describe('initialization', function ()
    {
        beforeEach(function ()
        {
            startCtrl.checkStorage();
        });

        it('should sessionStorage.isRandom set to false', function ()
        {
            expect($sessionStorageMock.isRandom).toBeFalsy();
        });
        it('should call checkStorage', function ()
        {
            expect(startCtrl.checkStorage).toHaveBeenCalled();
        });

    });

    describe('open', function ()
    {
        describe('when success', function ()
        {
            beforeEach(function ()
            {
                startCtrl.open();
            });
            afterEach(function ()
            {
                startCtrl.startVal = undefined;
                $localStorageMock.$reset();
            });
            it('should uibModal.open call', function ()
            {

                expect($uibModalMock.open).toHaveBeenCalled();
            });
            it('should set startVal', function ()
            {
                expect(startCtrl.startVal).toBe(1000);
            });
            it('should should set $localstorage.wallet.PLN', function ()
            {
                expect($localStorageMock.wallet.PLN).toEqual(1000);
            });
        });


    });

    describe('checkStorage', function ()
    {
        describe('when $wallet is undefined', function ()
        {
            beforeEach(function ()
            {
                $localStorageMock.$reset();
                startCtrl.checkStorage();
            });
            it('should call open', function ()
            {
                expect(startCtrl.open).toHaveBeenCalledWith('sm');
            });
        });
    });
    describe('when wallet defined', function ()
    {
        beforeEach(function ()
        {
            $localStorageMock.wallet = {
                PLN: 1000, EUR: 0,
            };
            spyOn($locationMock, 'path');
            startCtrl.checkStorage();

        });
        it('should location to main', function ()
        {
            expect($locationMock.path).toHaveBeenCalledWith('/main');
        });
    });
});
