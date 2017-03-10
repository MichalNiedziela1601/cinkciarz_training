'use strict';
const logManager = require('../business/logs.manager');
module.exports = function(server){

    server.route({
        method: 'GET',
        path: '/api/log',
        config: {
            auth: 'token'
        },
        handler: function(req,res){
            let id = req.auth.credentials.id;
            logManager.getLogs(id).then(result => {
                res(result);
            });
        }
    });
    server.route({
        method: 'POST',
        path: '/api/log',
        config: {
            auth: 'token'
        },
        handler: function(req,res){
            let id = req.auth.credentials.id;
            let log = req.payload;
            logManager.saveLog(log,id).then(() => {
                res();
            });
        }
    });
    server.route({
        method: 'DELETE',
        path: '/api/log',
        config: {
            auth: 'token'
        },
        handler: function(req,res){
            let id = req.auth.credentials.id;
            logManager.resetLog(id).then(() => {
                res();
            });
        }
    });
};
