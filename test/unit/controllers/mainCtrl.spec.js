describe('MainCtrl', function ()
{
    'use strict';

    var MainMock;
    var location;
    var walletMock;
    var localStorageMock;
    var RandomMock;
    var sessionStorageMock;
    var RatesMock;
    var LogMock;
    var wallet;
    var ratesMock;
    var logMock;
    var ratesRandom;
    var scope;
    var $uibModalMock;
    var fakeModal;
    var CurrenciesServiceMock;
    var $interval;
    var $intervalSpy;
    var newRandomRates;


    ratesMock = [{
        buy: 4.1635, code: 'USD', date: '2017-01-20', sell: 4.0811
    }, {
        buy: 4.4112, code: 'EUR', date: '2017-01-20', sell: 4.3238
    }, {
        buy: 5.123, code: 'GBP', date: '2017-01-20', sell: 5.0216
    }];


    beforeEach(module('cinkciarzTraining', function ($provide)
    {
        $provide.value('CurrenciesService', {
            getCurrencies: jasmine.createSpy('getCurrencies').and.callFake(function ()
            {
                return successfulPromise(ratesMock);
            })
        });
    }));
    beforeEach(
            inject(function ($controller, _$location_, _WalletService_, _$localStorage_, _RandomCurrencyService_, _$interval_, _$sessionStorage_, _LogFactory_,
                             _RatesFactory_, _$uibModal_, $rootScope, _CurrenciesService_)
            {
                location = _$location_;
                walletMock = _WalletService_;
                localStorageMock = _$localStorage_;
                RandomMock = _RandomCurrencyService_;
                sessionStorageMock = _$sessionStorage_;
                RatesMock = _RatesFactory_;
                LogMock = _LogFactory_;
                $uibModalMock = _$uibModal_;
                scope = $rootScope.$new();
                CurrenciesServiceMock = _CurrenciesService_;
                $interval = _$interval_;

                fakeModal = {
                    result: {
                        then: function (confirmCallback, cancelCallback)
                        {
                            //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
                            this.confirmCallBack = confirmCallback;
                            this.cancelCallback = cancelCallback;
                        }
                    }, close: function (item)
                    {
                        //The user clicked OK on the modal dialog, call the stored confirm callback with the selected item
                        this.result.confirmCallBack(item);
                    }, dismiss: function (type)
                    {
                        //The user clicked cancel on the modal dialog, call the stored cancel callback
                        this.result.cancelCallback(type);
                    }
                };


                ratesRandom = [{
                    buy: 4.2635, code: 'USD', date: '2017-01-20', sell: 4.1811
                }, {
                    buy: 4.5112, code: 'EUR', date: '2017-01-20', sell: 4.4238
                }, {
                    buy: 5.223, code: 'GBP', date: '2017-01-20', sell: 5.1216
                }];
                newRandomRates = [{
                    buy: 4.1655, code: 'USD', date: '2017-01-20', sell: 4.1111
                }, {
                    buy: 4.3912, code: 'EUR', date: '2017-01-20', sell: 4.4838
                }, {
                    buy: 5.293, code: 'GBP', date: '2017-01-20', sell: 5.1616
                }];

                wallet = {
                    PLN: 1000, USD: 100, EUR: 100, GBP: 0
                };

                logMock = [{message: 'Kupiłes 100 USD za 416.35 zł', date: '2017-01-26T11:25:28.653Z'}];

                spyOn(walletMock, 'getWallet').and.returnValue(wallet);
                spyOn(RatesMock, 'getRates').and.returnValue(ratesMock);
                spyOn(LogMock, 'getLog').and.returnValue(logMock);
                $intervalSpy = jasmine.createSpy('$interval', _$interval_ ).and.callThrough();

                MainMock = $controller('MainCtrl', {
                    $location: location,
                    WalletService: walletMock,
                    $localStorage: localStorageMock,
                    RandomCurrencyService: RandomMock,
                    $interval: $interval,
                    $sessionStorage: sessionStorageMock,
                    RatesFactory: RatesMock,
                    LogFactory: LogMock,
                    $uibModal: $uibModalMock
                });

            }));

    describe('initialization', function ()
    {
        it('should set wallet', function ()
        {
            expect(MainMock.wallet).toEqual(wallet);
        });
        it('should set rates', function ()
        {
            expect(MainMock.rates).toEqual(ratesMock);
        });
        it('should set randomRates', function ()
        {
            expect(MainMock.randomRates).toBeEmptyArray();
        });
        it('should set logs', function ()
        {
            expect(MainMock.logs).toEqual(logMock);
        });
        it('should set showArrows', function ()
        {
            expect(MainMock.showArrows).toBeFalse();
        });
    });

    describe('checkRandom', function ()
    {
        describe('when no random', function ()
        {
            beforeEach(function ()
            {
                sessionStorageMock.isRandom = false;

                MainMock.toggleRandomRates();
            });
            it('should set showArrows', function ()
            {
                expect(MainMock.showArrows).toBe(false);
            });
        });

        describe('when is random', function ()
        {
            beforeEach(function ()
            {
                sessionStorageMock.isRandom = false;
                spyOn(RandomMock, 'setRandomRates');
                spyOn(RandomMock, 'getRandomRates').and.callFake(function(){
                    return newRandomRates;
                });
                spyOn(MainMock, 'getRandomRates').and.callThrough();
                MainMock.toggleRandomRates();
                $intervalSpy.flush(5001);
            });
            it('should call setRandomRates', function ()
            {
                expect(RandomMock.setRandomRates).toHaveBeenCalled();
            });

            it('should set showArrows', function ()
            {
                expect(MainMock.showArrows).toBe(true);
            });

            it('should set new rates', function ()
            {
                expect(MainMock.rates).toEqual(newRandomRates);
            });
        });


    });

    describe('getRandomRates', function ()
    {
        beforeEach(function ()
        {
            spyOn(RandomMock, 'getRandomRates').and.callFake(function ()
            {
                return ratesRandom;
            });
            MainMock.getRandomRates();
        });
        it('should call getRandomRates', function ()
        {
            expect(RandomMock.getRandomRates).toHaveBeenCalled();
        });

        it('should set rates', function ()
        {
            expect(MainMock.rates).toEqual(ratesRandom);
        });
    });

    describe('reset', function ()
    {
        describe('when ok', function ()
        {


            beforeEach(function ()
            {
                spyOn(LogMock, 'empty');
                spyOn(walletMock, 'reset');
                spyOn($uibModalMock, 'open').and.returnValue(fakeModal);
                spyOn(location, 'path');
                MainMock.reset();
                MainMock.modalInstance.close();
            });

            it('should call location', function ()
            {
                expect(location.path).toHaveBeenCalledWith('/');
            });
            it('should call LogFactory.empty', function ()
            {
                expect(LogMock.empty).toHaveBeenCalled();
            });
            it('should call WalletService.reset', function ()
            {
                expect(walletMock.reset).toHaveBeenCalled();
            });
        });
    });

    describe('checkCurrencyWallet', function ()
    {
        describe('when wallet is null', function ()
        {
            beforeEach(function ()
            {
                localStorageMock.wallet = null;

            });
            it('should return true', function ()
            {
                expect(MainMock.checkCurrencyWallet('USD')).toBeFalsy();
            });
        });
        describe('when wallet is not null', function ()
        {
            beforeEach(function ()
            {
                localStorageMock.wallet = wallet;
            });
            it('should return true if currency is greathen then 0', function ()
            {
                expect(MainMock.checkCurrencyWallet('USD')).toBeFalse();
                expect(MainMock.checkCurrencyWallet('EUR')).toBeFalse();
            });
            it('should return false if currency is lower or equal 0', function ()
            {
                expect(MainMock.checkCurrencyWallet('GBP')).toBeTrue();
            });
        });
    });



    describe('isRandom', function ()
    {
        it('should return true if random', function ()
        {
            sessionStorageMock.isRandom = true;
            expect(MainMock.isRandom()).toBeTrue();
        });
        it('should return false is not random', function ()
        {
            sessionStorageMock.isRandom = false;
            expect(MainMock.isRandom()).toBeFalse();
        });
    });
    describe('toggleRandomRates', function ()
    {
        describe('when isRandom is false', function ()
        {
            beforeEach(function ()
            {
                sessionStorageMock.isRandom = false;
                MainMock.toggleRandomRates();

            });
            it('should set isRandom to true', function ()
            {
                expect(sessionStorageMock.isRandom).toBe(true);
            });
        });
        describe('when isRandom is true', function ()
        {
            beforeEach(function ()
            {
                sessionStorageMock.isRandom = true;
                MainMock.toggleRandomRates();

            });
            it('should set isRandom to false', function ()
            {
                expect(sessionStorageMock.isRandom).toBe(false);
            });
        });
    });

    describe('showLog', function ()
    {
        beforeEach(function ()
        {
            MainMock.showLog();
        });
        it('should call getLog', function ()
        {
            expect(LogMock.getLog).toHaveBeenCalled();
        });
        it('should set logs', function ()
        {
            expect(MainMock.logs).toEqual(logMock);
        });

    });

    describe('diffBuy', function ()
    {
        describe('when buy is greaten for old buy', function ()
        {
            beforeEach(function ()
            {
                spyOn(RatesMock, 'getOldRates').and.returnValue(ratesMock);
            });
            it('should return true', function ()
            {
                expect(MainMock.diffBuy('USD',ratesRandom[0].buy)).toBe(true);
            });
        });

        describe('when buy is not greaten for old buy', function ()
        {
            beforeEach(function ()
            {
                spyOn(RatesMock, 'getOldRates').and.returnValue(ratesRandom);
            });
            it('should return false', function ()
            {
                expect(MainMock.diffBuy('EUR', ratesRandom[1].buy)).toBe(false);
            });
        });
    });
    describe('diffSell', function ()
    {
        describe('when sell is greaten for old sell', function ()
        {
            beforeEach(function ()
            {
                spyOn(RatesMock, 'getOldRates').and.returnValue(ratesMock);
            });
            it('should return true', function ()
            {
                expect(MainMock.diffSell('USD',ratesRandom[0].sell)).toBe(true);
            });
        });

        describe('when sell is not greaten for old sell', function ()
        {
            beforeEach(function ()
            {
                spyOn(RatesMock, 'getOldRates').and.returnValue(ratesRandom);
            });
            it('should return false', function ()
            {
                expect(MainMock.diffSell('EUR', ratesRandom[1].sell)).toBe(false);
            });
        });
    });

});
