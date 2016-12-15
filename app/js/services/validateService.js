/**
 * Created by student on 13.12.16.
 */
(function (angular)
{
    'use strict';

    function ValidateService()
    {

       var errorMessage = '';

        this.validateEmpty = function (value)
        {
            return !!(value === undefined || value === '' || parseFloat(value) === 0.0);
        };

        this.getValues = function (message)
        {
            errorMessage = message;
            return errorMessage;
        };

    }

    angular.module('cinkciarzTraining')
            .service('ValidateService', ValidateService);


})(angular);
