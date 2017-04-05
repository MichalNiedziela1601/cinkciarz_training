(function ()
{
    'use strict';
    function LogFactory($http,moment)
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
                    var logs = response.data;
                    logs.map(function(log){
                        log.data = moment(log.data).format('DD/MM/YYYY o hh:mm');
                    });
                    return logs;
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
