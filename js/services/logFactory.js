(function ()
{
    'use strict';
    function LogFactory($localStorage)
    {

        function LoggerFactory(){

            var LogObj = function (message)
            {
                this.message = message;
                this.date = new Date();
            };

            this.logArr = $localStorage.log;
            this.addLog = function(message)
            {
                this.logArr.push(new LogObj(message));
            };

            this.getLog = function ()
            {
                return this.logArr;
            };

            this.empty = function ()
            {
                this.logArr = [];
            };
        }

        return new LoggerFactory();
    }

    angular.module('cinkciarzTraining')
            .factory('LogFactory', LogFactory);

})();
