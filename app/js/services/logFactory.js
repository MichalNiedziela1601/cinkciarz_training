(function ()
{
    'use strict';
    function LogFactory($localStorage)
    {


        var LogObj = function (message)
        {
            this.message = message;
            this.date = new Date();
        };

        function LoggerFactory(){
            var ctrl = this;
            ctrl.logArr = $localStorage.log;
            ctrl.addLog = function(message)
            {
                ctrl.logArr.push(new LogObj(message));
            };

            ctrl.getLog = function ()
            {
                return ctrl.logArr;
            };

            ctrl.empty = function ()
            {
                ctrl.logArr = [];
            };
        }

        return new LoggerFactory();
    }

    angular.module('cinkciarzTraining')
            .factory('LogFactory', LogFactory);

})();
