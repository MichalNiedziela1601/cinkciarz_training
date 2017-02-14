describe('WalletService', function ()
{
    'use strict';
    var walletSerMock;
    var storage;
    var LogFactory;
    var rate;
    var value;
    var code;

    beforeEach(module('cinkciarzTraining'));
    beforeEach(inject(function(_$localStorage_,_LogFactory_,_WalletService_){
       storage = _$localStorage_;
        LogFactory = _LogFactory_;
        walletSerMock = _WalletService_;

        spyOn(LogFactory,'addLog');
        storage.$reset();

        storage.$default({
            wallet: {
                PLN: 1000,
                EUR: 100,
                USD: 100,
                GBP: 100
            }
        });

    }));

    describe('getWallet', function ()
    {
        it('should return wallet', function ()
        {
            expect(walletSerMock.getWallet()).toEqual(storage.wallet);
        });
    });

    describe('sell', function ()
    {
        beforeEach(function ()
        {
            rate = 4;
            value = 10;
            code = 'USD';

            walletSerMock.sell(code,rate,value);

        });
        it('should call addLog', function ()
        {
            expect(LogFactory.addLog).toHaveBeenCalled();
        });
        it('should update wallet', function ()
        {
            expect(walletSerMock.getWallet()).toEqual({ PLN: 1040, EUR: 100, USD: 90, GBP: 100 });
        });
    });

    describe('buy', function ()
    {
        beforeEach(function ()
        {
            rate = 4;
            value = 10;
            code = 'USD';

            walletSerMock.buy(code,rate,value);

        });
        it('should call addLog', function ()
        {
            expect(LogFactory.addLog).toHaveBeenCalled();
        });
        it('should update wallet', function ()
        {
            expect(walletSerMock.getWallet()).toEqual({ PLN: 960, EUR: 100, USD: 110, GBP: 100 });
        });
    });

    describe('reset', function ()
    {
        it('should reset wallet', function ()
        {
            walletSerMock.reset();
            expect(walletSerMock.getWallet()).toBeUndefined();
        });
    });

});
