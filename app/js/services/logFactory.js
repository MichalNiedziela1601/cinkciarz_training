(function ()
{
    'use strict';
    function LogFactory($http)
    {

        function LoggerFactory(){
            var url = 'http://localhost:3000/api/log';


            this.addLog = function(message)
            {
                return $http.post(url, { message: message}).then(function () {

                });
            };

            this.getLog = function()
            {
                return $http.get(url).then(function(response){
                    return response.data;
                });
            };

            this.empty = function ()
            {
                return $http.delete(url).then(function(){

                });
            };
        }

        return new LoggerFactory();
    }

    angular.module('cinkciarzTraining')
            .factory('LogFactory', LogFactory);

})();
