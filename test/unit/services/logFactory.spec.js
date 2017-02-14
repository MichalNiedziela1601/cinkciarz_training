describe('LogFactory', function ()
{
    'use strict';
    var LogFactory;
    var storage;
    var LogObj;
    var baseTime;

    beforeEach(module('cinkciarzTraining'));
    beforeEach(inject(function (_LogFactory_, $localStorage)
    {
        storage = $localStorage;
        storage.log = [];

        LogObj = function (message)
        {
            this.message = message;
            this.date = new Date();
        };

        LogFactory = _LogFactory_;
        LogFactory.logArr = storage.log;
        baseTime = new Date();
        spyOn(window, 'Date').and.callFake(function() {
            return baseTime;
        });

    }));
    afterEach(function ()
    {
        storage.$reset();
    });

    describe('init', function ()
    {
        it('should set logArr', function ()
        {
            expect(LogFactory.logArr).toEqual([ ]);
        });
    });

    describe('addLog', function ()
    {
        it('should add log', function ()
        {
            LogFactory.addLog('buy some');
            expect(LogFactory.logArr[0].message).toEqual('buy some');
            expect(LogFactory.logArr[0].date).toEqual(baseTime);
        });
    });

    describe('getLog', function ()
    {
        var date;
        beforeEach(function ()
        {
            LogFactory.addLog('something');
            date = LogFactory.getLog()[0].date;
        });
        it('should be array', function ()
        {
            var array = LogFactory.getLog();
            expect(array).toBeArray();
        });
        it('should return array', function ()
        {
            var array = LogFactory.getLog();
            expect(array[0]).toBeObject();
        });
    });

    describe('empty', function ()
    {
        it('should logArr be empty array', function ()
        {
            LogFactory.empty();
            expect(LogFactory.logArr).toBeEmptyArray();
        });
    });
});
