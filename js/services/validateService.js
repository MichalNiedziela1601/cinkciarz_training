/**
 * Created by student on 13.12.16.
 */
(function (angular)
{
    'use strict';

    function ValidateService()
    {

        this.validObject = {
            show: false, message: ''
        };

        this.validateEmpty = function (value)
        {

            return !!(value === undefined || value === '' || parseInt(value, 10) === 0);
        };

        this.getValues = function (show, message)
        {
            this.validObject.show = show;
            this.validObject.message = message;
            return this.validObject;
        };

    }

    angular.module('cinkciarzTraining')
            .service('ValidateService', ValidateService);


})(angular);
