describe('RatesFactory', function ()
{
    'use strict';

    var storage;
    var RatesFactoryMock;
    var rates;

    beforeEach(module('cinkciarzTraining'));
    beforeEach(inject(function (_RatesFactory_, _$sessionStorage_)
    {
        storage = _$sessionStorage_;

        rates = [{
            buy: 4.1635, code: 'USD', date: '2017-01-20', sell: 4.0811
        }, {
            buy: 4.4112, code: 'EUR', date: '2017-01-20', sell: 4.3238
        }, {
            buy: 5.123, code: 'GBP', date: '2017-01-20', sell: 5.0216
        }];
        storage.rates = rates;

        RatesFactoryMock = _RatesFactory_;
        RatesFactoryMock.rates = angular.copy(storage.rates);
    }));

    afterEach(function ()
    {
        storage.$reset();
    });

    describe('initialization', function ()
    {
        it('should set rates', function ()
        {
            expect(RatesFactoryMock.rates).toEqual(rates);
        });
        it('should set oldRates', function ()
        {
            expect(RatesFactoryMock.oldRates).toBeEmptyArray();
        });
    });

    describe('getRates', function ()
    {
        it('should return rates', function ()
        {
            expect(RatesFactoryMock.getRates()).toEqual(rates);
        });
    });

    describe('getOldRates', function ()
    {
        it('should return  oldRates', function ()
        {
            expect(RatesFactoryMock.getOldRates()).toBeEmptyArray();
        });
    });

    describe('addRates', function ()
    {
        var newRates;
        beforeEach(function ()
        {
            newRates = [{
                buy: 4.3635, code: 'USD', date: '2017-01-20', sell: 4.2811
            }, {
                buy: 4.1112, code: 'EUR', date: '2017-01-20', sell: 4.2238
            }, {
                buy: 5.423, code: 'GBP', date: '2017-01-20', sell: 5.2216
            }];
            RatesFactoryMock.addRates(newRates);
        });
        it('should set new rates to rates', function ()
        {
            // RatesFactoryMock.addRates(newRates);
            var ra = RatesFactoryMock.getRates();
            expect(ra).toEqual(newRates);
        });
        it('should copy rates to oldRates', function ()
        {
            expect(RatesFactoryMock.getOldRates()).toEqual(rates);
        });
    });


});
