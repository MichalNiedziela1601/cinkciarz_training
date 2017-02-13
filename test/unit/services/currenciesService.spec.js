describe('CurrenciesService', function ()
{
    'use strict';

    var CurrenciesMock;
    var httpMock;
    var qMock;
    var fakeRates = [
        {
            buy: 4.1635, code: 'USD', date: '2017-01-20', sell: 4.0811
        }, {
            buy: 4.4112, code: 'EUR', date: '2017-01-20', sell: 4.3238
        }, {
            buy: 5.123, code: 'GBP', date: '2017-01-20', sell: 5.0216
        }
    ];
    var rootScope;
    var result;

    beforeEach(module('cinkciarzTraining', function ($provide)
    {
        $provide.value('CurrenciesService', {
            getCurrencies: jasmine.createSpy('getCurrencies').and.callFake(function ()
            {
                return successfulPromise(fakeRates);
            })
        });
    }));
    beforeEach(module('cinkciarzTraining', function ($provide)
    {
        httpMock = jasmine.createSpyObj('http', ['get']);
        httpMock.get.and.returnValue(successfulPromise({data: fakeRates[0]}));
        $provide.value('$http', httpMock);

    }));

    beforeEach(inject(function (_CurrenciesService_, _$q_, _$rootScope_)
    {
        qMock = _$q_;
        CurrenciesMock = _CurrenciesService_;
        rootScope = _$rootScope_;

    }));

    describe('getCurencies', function ()
    {
        describe('when call requests', function ()
        {
            beforeEach(function ()
            {
                CurrenciesMock.getCurrencies().then(function (data)
                {
                    result = data;
                });
                rootScope.$apply();

            });
            it('should return rates', function ()
            {

                expect(result).toEqual(fakeRates);
            });
        });
    });
});

