/**
 * Created by sunday on 06.03.17.
 */
'use strict';
const config = require('../config');
const loginManager = require('../business/login.manager');
const routes = require('../rest/routes');

let validate = function(request, dekodeToken, callback){
    var error;
    loginManager.getUser(dekodeToken.email).then((result) => {
        var credentials = result;
        if(dekodeToken.email === credentials.email){
            return callback(error,true, credentials);
        }else {
            return callback(error,false,credentials);
        }


    });

};

module.exports = function (server) {
    server.register({
        register: require('hapi-auth-jwt')
    }, function(error){
        if(!error) {
            server.auth.strategy('token', 'jwt', {
                key: config.secret, validateFunc: validate, verifyOptions: {algorithms: ['HS256']}
            });
            routes(server);
        } else {
            throw error;
        }
    });
};
