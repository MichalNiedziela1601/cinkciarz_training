/**
 * Created by sunday on 23.02.17.
 */
'use strict';
const logManager = require('../business/logs.manager');
module.exports = function(server){

    server.route({
        method: 'GET',
        path: '/api/log',
        handler: function(req,res){
            logManager.getLogs().then(result => {
                res(result);
            });
        }
    });
    server.route({
        method: 'POST',
        path: '/api/log',
        handler: function(req,res){
            let log = req.payload;
            logManager.saveLog(log).then(result => {
                res(result);
            });
        }
    });
    server.route({
        method: 'DELETE',
        path: '/api/log',
        handler: function(req,res){
            logManager.resetLog().then(() => {
                res();
            });
        }
    })
};