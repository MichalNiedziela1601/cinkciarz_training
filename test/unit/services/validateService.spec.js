describe('ValidateServvice', function ()
{
    'use strict';
    var validateMock;

    beforeEach(module('cinkciarzTraining'));
    beforeEach(inject(function (_ValidateService_)
    {

        validateMock = _ValidateService_;
    }));

    describe('validateEmpty', function ()
    {
        it('should return true if empty', function ()
        {

            expect(validateMock.validateEmpty()).toBeTrue();
            expect(validateMock.validateEmpty(0)).toBeTrue();
            expect(validateMock.validateEmpty('')).toBeTrue();
        });
        it('should return false if not empty', function ()
        {
            expect(validateMock.validateEmpty(23)).toBeFalsy();
            expect(validateMock.validateEmpty(23.8)).toBeFalsy();
        });
    });

    describe('getValues', function ()
    {
        it('should return message', function ()
        {
            var message = 'No money';
            expect(validateMock.getValues(message)).toEqual(message);
        });
    });
});
