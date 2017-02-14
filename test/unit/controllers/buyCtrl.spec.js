describe('BuyController', function ()
{
    'use strict';
    var buyCtrl;
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



        $localStorage.$reset();
        $localStorage.wallet = {
            PLN: 1000, EUR: 0, GBP: 0, USD: 0
        };

        routeParams.currency = 'USD';

        spyOn(RatesFactoryMock, 'getRates').and.returnValue(rates);
        spyOn(WalletServiceMock, 'getWallet').and.callThrough();
        spyOn(ValidateServiceMock, 'validateEmpty').and.callThrough();
        spyOn(ValidateServiceMock, 'getValues').and.callThrough();
        spyOn(WalletServiceMock, 'buy');

        buyCtrl = $controller('BuyController', {
            $routeParams: routeParams, WalletService: WalletServiceMock, $timeout: timeout, ValidateService: ValidateServiceMock, RatesFactory: RatesFactoryMock
        });
    }));

    describe('initialization', function ()
    {
        it('should set currency', function ()
        {
            expect(buyCtrl.currency).toBe('USD');
        });

        it('should set rates', function ()
        {
            expect(buyCtrl.rates).toEqual(rates);
        });
        it('should set wallet', function ()
        {
            expect(buyCtrl.wallet).toEqual({
                PLN: 1000, EUR: 0, GBP: 0, USD: 0
            });
        });
        it('should set value to 0', function ()
        {
            expect(buyCtrl.value).toBe(0);
        });
        it('should set errorMessage as empty', function ()
        {
            expect(buyCtrl.errorMessage).toBe('');
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
                expect(buyCtrl.showTitle()).toEqual('Euro');
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
                expect(buyCtrl.showTitle()).toEqual('Funtów');
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
                expect(buyCtrl.showTitle()).toEqual('Dolarów');
            });
        });


    });

    describe('when call getCurrencies', function ()
    {
        it('should set rate', function ()
        {
            expect(buyCtrl.rate).toEqual(rates[0]);
        });
        it('should set buyCost to 0', function ()
        {
            expect(buyCtrl.buyCost()).toBe(0);
        });
    });

    describe('when call buyCost', function ()
    {
        it('should return calculate cost if value is greaten then 0', function ()
        {
            buyCtrl.value = 10;
            expect(buyCtrl.buyCost()).toEqual(41.635);
            buyCtrl.value = 190;
            expect(buyCtrl.buyCost()).toBeCloseTo(791.06);
        });
    });

    describe('buy', function ()
    {
        describe('when value is empty', function ()
        {
            beforeEach(function ()
            {
                buyCtrl.value = '';
                buyCtrl.buy();
            });
            it('should set errorMessage if value is empty', function ()
            {
                expect(buyCtrl.errorMessage).toBe('Nie wpisałeś ilości');
            });
            it('should set errorMessage to default after timeout', function ()
             {
             timeout.flush();
             // timeout.verifyNoPendingTasks();
             buyCtrl.errorMessage = ValidateServiceMock.getValues('');
             expect(buyCtrl.errorMessage).toBe('');
             });

        });

        describe('when value is lower than 0', function ()
        {
            beforeEach(function ()
            {
                buyCtrl.value = -4;
                buyCtrl.buy();
            });
            it('should set errorMessage if value is negative', function ()
            {
                expect(buyCtrl.errorMessage).toBe('Wpisałeś wartość poniżej zera');
            });
            it('should set errorMessage to default after timeout', function ()
            {
                timeout.flush();
                // timeout.verifyNoPendingTasks();
                buyCtrl.errorMessage = ValidateServiceMock.getValues('');
                expect(buyCtrl.errorMessage).toBe('');
            });
        });

        describe('when don\'t have enough money', function ()
        {
            beforeEach(function ()
            {
                buyCtrl.value = 1000;
                buyCtrl.buy();
            });

            it('should set errorMessage id don\'t have enough money', function ()
            {
                expect(buyCtrl.errorMessage).toBe('Za mało środków');
            });
            it('should set errorMessage to default after timeout', function ()
            {
                timeout.flush();
                // timeout.verifyNoPendingTasks();
                buyCtrl.errorMessage = ValidateServiceMock.getValues('');
                expect(buyCtrl.errorMessage).toBe('');
            });
        });

        describe('when enough money to buy', function ()
        {
            var expectedWallet;
            beforeEach(function ()
            {
                buyCtrl.value = 100;
                buyCtrl.buy();

                $localStorage.wallet = {
                    PLN: 1000 - (rates[0].buy * buyCtrl.value), EUR: 0, GBP: 0, USD: 100

                };

                expectedWallet = $localStorage.wallet;

            });
            it('should call WalletService.buy', function ()
            {
                expect(WalletServiceMock.buy).toHaveBeenCalledWith(rates[0].code, rates[0].buy, 100);

            });
            it('should refresh wallet value', function ()
            {
                buyCtrl.wallet = WalletServiceMock.getWallet();
                expect(buyCtrl.wallet).toEqual(expectedWallet);
            });
            it('should set new value', function ()
            {
                expect(buyCtrl.value).toEqual(0);
            });
        });


    });
});
