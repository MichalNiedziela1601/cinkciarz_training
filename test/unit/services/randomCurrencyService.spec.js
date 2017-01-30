describe('RandomCurrencyService', function ()
{
    'use strict';

    var RatesFactoryMock;
    var CurrenciesServiceMock;
    var rates;
    var Random;
    var ratesOriginal;

    function generateMath(val)
    {
        spyOn(Math, 'random').and.returnValue(val);
    }

    beforeEach(module('cinkciarzTraining'));
    beforeEach(inject(function(_RandomCurrencyService_, _RatesFactory_, _CurrenciesService_){
        RatesFactoryMock = _RatesFactory_;
        CurrenciesServiceMock = _CurrenciesService_;
        Random = _RandomCurrencyService_;

        rates = [{
            buy: 4.1635, code: 'USD', date: '2017-01-20', sell: 4.0811
        }, {
            buy: 4.4112, code: 'EUR', date: '2017-01-20', sell: 4.3238
        }, {
            buy: 5.123, code: 'GBP', date: '2017-01-20', sell: 5.0216
        }];

        ratesOriginal = [{
            buy: 4.2635, code: 'USD', date: '2017-01-20', sell: 4.1811
        }, {
            buy: 4.5112, code: 'EUR', date: '2017-01-20', sell: 4.4238
        }, {
            buy: 5.223, code: 'GBP', date: '2017-01-20', sell: 5.1216
        }];


        spyOn(RatesFactoryMock, 'getRates').and.returnValue(rates);

        Random.randomRates = RatesFactoryMock.getRates();
        Random.getOrginalRates();
    }));

    describe('initialization', function ()
    {
        it('should set randomRates', function ()
        {
            expect(Random.randomRates).toEqual(rates);
        });
        describe('when getCurrencies success', function ()
        {
            beforeEach(function ()
            {
                spyOn(CurrenciesServiceMock, 'getCurrencies').and.callFake(function ()
                {
                    return successfulPromise(ratesOriginal);
                });
                Random.getOrginalRates();
            });
            it('should set orginalRates', function ()
            {
                expect(Random.orginalRates).toEqual(ratesOriginal);
            });
        });
        describe('when getCurrencies fail', function ()
        {
            beforeEach(function ()
            {
                spyOn(CurrenciesServiceMock, 'getCurrencies').and.callFake(function ()
                {
                    return unsuccessfulPromise();
                });
                spyOn(console,'log');
                Random.getOrginalRates();
            });
            it('should call console.log', function ()
            {
                expect(console.log).toHaveBeenCalled();
            });
        });

    });

    describe('randomValue', function ()
    {
        var val = 0.3;
        beforeEach(function ()
        {
            generateMath(val);
        });
        it('should return random Value', function ()
        {
            expect(parseFloat(Random.randomValue())).toEqual(0.3);
        });
    });

    describe('operations', function ()
    {
        beforeEach(function ()
        {
            generateMath(0.3);
        });
        describe('when minus operation', function ()
        {
            it('should return new currency Rate', function ()
            {
                expect(parseFloat(Random.operations(rates[0].sell, '-'))).toEqual(4.0689);
                expect(parseFloat(Random.operations(rates[0].buy, '-'))).toEqual(4.151);
            });
        });
        describe('when plus operation', function ()
        {
            it('should return new currency rate', function ()
            {
                expect(parseFloat(Random.operations(rates[0].sell, '+'))).toEqual(4.0933);
                expect(parseFloat(Random.operations(rates[0].buy, '+'))).toEqual(4.176);
            });
        });
    });

    describe('randomOperations', function ()
    {
        describe('when random is 1', function ()
        {
            beforeEach(function ()
            {
                generateMath(0.3);
            });
            it('should return new value', function ()
            {
                expect(parseFloat(Random.randomOperations(rates[0].sell))).toEqual(4.0689);
                expect(parseFloat(Random.randomOperations(rates[0].buy))).toEqual(4.1510);
            });
        });

        describe('when random is 0', function ()
        {
            beforeEach(function ()
            {
                generateMath(1.1);
            });
            it('should return new value', function ()
            {
                expect(parseFloat(Random.randomOperations(rates[0].sell))).toEqual(4.126);
            });
        });

    });

    describe('setRandomRates', function ()
    {
        beforeEach(function ()
        {
            spyOn(RatesFactoryMock, 'addRates');
            spyOn(CurrenciesServiceMock, 'getCurrencies').and.callFake(function ()
            {
                return successfulPromise(ratesOriginal);
            });
            Random.getOrginalRates();
            generateMath(0.3);
            Random.setRandomRates();
        });

        it('should call addRates', function ()
        {
            expect(RatesFactoryMock.addRates).toHaveBeenCalled();
        });
        it('should call addRates one time', function ()
        {
            expect(RatesFactoryMock.addRates.calls.count()).toBe(1);
        });

        describe('when isDiffrentBig', function ()
        {
            beforeEach(function ()
            {
                Random.isDiffrentToBig(19,16);
            });
            it('should call', function ()
            {

            });
        });
    });

    describe('isDiffrentToBig', function ()
    {
        it('should return true is big', function ()
        {
            expect(Random.isDiffrentToBig(94,100)).toBeTruthy();
            expect(Random.isDiffrentToBig(106,100)).toBeTruthy();
        });
        it('should returl false is not to big', function ()
        {
            expect(Random.isDiffrentToBig(98,100)).toBeFalsy();
            expect(Random.isDiffrentToBig(102,100)).toBeFalsy();
        });
    });

    describe('mathDiff', function ()
    {
        it('should return diff percent value', function ()
        {
            expect(Random.mathDiff(5,4)).toBe(20);
            expect(Random.mathDiff(8,4)).toBe(50);
        });
    });

    describe('getRandomRates', function ()
    {
        it('should return randomRates', function ()
        {
            expect(Random.getRandomRates()).toEqual(rates);
        });
    });


});
