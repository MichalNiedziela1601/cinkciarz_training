describe('SellController', function ()
{
    'use strict';
    var sellCtrl;
    var routeParams;
    var WalletServiceMock;
    var timeout;
    var ValidateServiceMock;
    var RatesFactoryMock;
    var rates;
    var $localStorage;

    rates = [{
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
                return successfulPromise(rates);
            })
        });
    }));
    beforeEach(inject(function ($controller, _$routeParams_, _WalletService_, _$timeout_, _ValidateService_, _RatesFactory_, _$localStorage_)
    {
        routeParams = _$routeParams_;
        WalletServiceMock = _WalletService_;
        timeout = _$timeout_;
        ValidateServiceMock = _ValidateService_;
        RatesFactoryMock = _RatesFactory_;
        $localStorage = _$localStorage_;

        rates = [{
            buy: 4.1635, code: 'USD', date: '2017-01-20', sell: 4.0811
        }, {
            buy: 4.4112, code: 'EUR', date: '2017-01-20', sell: 4.3238
        }, {
            buy: 5.123, code: 'GBP', date: '2017-01-20', sell: 5.0216
        }];
        $localStorage.$reset();
        $localStorage.wallet = {
            PLN: 1000, EUR: 100, GBP: 0, USD: 0
        };

        routeParams.currency = 'EUR';

        spyOn(RatesFactoryMock, 'getRates').and.returnValue(rates);
        spyOn(WalletServiceMock, 'getWallet').and.callThrough();
        spyOn(ValidateServiceMock, 'validateEmpty').and.callThrough();
        spyOn(ValidateServiceMock, 'getValues').and.callThrough();
        spyOn(WalletServiceMock, 'sell');

        sellCtrl = $controller('SellController', {
            $routeParams: routeParams, WalletService: WalletServiceMock, $timeout: timeout, ValidateService: ValidateServiceMock, RatesFactory: RatesFactoryMock
        });
    }));

    describe('initialization', function ()
    {
        it('should set currency', function ()
        {
            expect(sellCtrl.currency).toBe('EUR');
        });
        it('should set rates', function ()
        {
            expect(sellCtrl.rates).toEqual(rates);
        });
        it('should set wallet', function ()
        {
            expect(sellCtrl.wallet).toEqual({
                PLN: 1000, EUR: 100, GBP: 0, USD: 0
            });
        });
        it('should set value to 0', function ()
        {
            expect(sellCtrl.value).toBe(0);
        });
        it('should set errorMessage as empty', function ()
        {
            expect(sellCtrl.errorMessage).toBe('');
        });
    });

    describe('showTitle', function ()
    {
        describe('when routeParams.currency = EUR', function ()
        {
            beforeEach(function ()
            {
                routeParams.currency = 'EUR';
            });
            it('should return \'Euro\' if currency = \'EUR\'', function ()
            {
                expect(sellCtrl.showTitle()).toEqual('Euro');
            });
        });

        describe('when routeParams.currency = GBP', function ()
        {
            beforeEach(function ()
            {
                routeParams.currency = 'GBP';
            });
            it('should return \'Funtów\'', function ()
            {
                expect(sellCtrl.showTitle()).toEqual('Funtów');
            });
        });

        describe('when routeParams.currency = USD', function ()
        {
            beforeEach(function ()
            {
                routeParams.currency = 'USD';
            });
            it('should return \'Dolarów\'', function ()
            {
                expect(sellCtrl.showTitle()).toEqual('Dolarów');
            });
        });


    });

    describe('getCurrencies', function ()
    {
        describe('when call', function ()
        {
            it('should set rate', function ()
            {
                expect(sellCtrl.rate).toEqual(rates[1]);
            });
            it('should set sellCost', function ()
            {
                expect(sellCtrl.sellCost()).toBe(0);
            });
        });
    });

    describe('sellCost', function ()
    {
        describe('when value is less then 0', function ()
        {
            it('should return 0', function ()
            {
                sellCtrl.value = 0;
                expect(sellCtrl.sellCost()).toEqual(0);
            });
        });
        describe('when value is greaten then 0', function ()
        {
            it('should return calculate value', function ()
            {
                sellCtrl.value = 10;
                expect(sellCtrl.sellCost()).toBe(sellCtrl.value * sellCtrl.rate.sell);
                sellCtrl.value = 67;
                expect(sellCtrl.sellCost()).toBe(sellCtrl.value * sellCtrl.rate.sell);
            });
        });
    });


    describe('sell', function ()
    {
        describe('when value is empty', function ()
        {
            beforeEach(function ()
            {
                sellCtrl.value = '';
                sellCtrl.sell();
            });
            it('should set errorMessage if value is empty', function ()
            {
                expect(sellCtrl.errorMessage).toBe('Nie wpisałeś ilości');
            });
            it('should set errorMessage to default after timeout', function ()
            {
                timeout.flush();
                // timeout.verifyNoPendingTasks();
                sellCtrl.errorMessage = ValidateServiceMock.getValues('');
                expect(sellCtrl.errorMessage).toBe('');
            });
        });

        describe('when value is lesser then 0', function ()
        {
            beforeEach(function ()
            {
                sellCtrl.value = -2;
                sellCtrl.sell();
            });
            it('should set errorMessage if value is lesser than 0', function ()
            {
                expect(sellCtrl.errorMessage).toBe('Wpisałeś wartość poniżej zera');
            });
            it('should set errorMessage to default after timeout', function ()
            {
                timeout.flush();
                // timeout.verifyNoPendingTasks();
                sellCtrl.errorMessage = ValidateServiceMock.getValues('');
                expect(sellCtrl.errorMessage).toBe('');
            });
        });

        describe('when not enough money to sell', function ()
        {
            beforeEach(function ()
            {
                sellCtrl.value = 102;
                sellCtrl.sell();
            });
            it('should set errorMessage', function ()
            {
                expect(sellCtrl.errorMessage).toBe('Za mało środków');
            });
            it('should set errorMessage to default after timeout', function ()
            {
                timeout.flush();
                // timeout.verifyNoPendingTasks();
                sellCtrl.errorMessage = ValidateServiceMock.getValues('');
                expect(sellCtrl.errorMessage).toBe('');
            });
        });

        describe('when enough money to sell', function ()
        {
            var expectedWallet;
            beforeEach(function ()
            {
                sellCtrl.value = 10;
                sellCtrl.sell();

                $localStorage.wallet = {
                    PLN: 1000 + (sellCtrl.rate.sell * sellCtrl.value) , EUR: 100 - sellCtrl.value, GBP: 0, USD: 0

                };

                expectedWallet = $localStorage.wallet;
            });
            it('should call WalletService.sell()', function ()
            {
                expect(WalletServiceMock.sell).toHaveBeenCalled();
            });
            it('should refresh wallet value', function ()
            {
                expect(sellCtrl.wallet).toEqual(expectedWallet);
            });
            it('should set value to 0', function ()
            {
                expect(sellCtrl.value).toBe(0);
            });
        });
    });
});
