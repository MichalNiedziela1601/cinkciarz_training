'use strict';
const loginManager = require('../business/login.manager');
const _ = require('lodash');

module.exports = function(server) {

    server.route({
        method: 'GET',
        path: '/api/login',
        handler: function (req, res) {
            loginManager.getUsers().then(result => {

                res(result);
            });
        }
    });

    server.route({
        method: 'POST',
        path: '/api/login',
        handler: function (req, res)
        {
            let person = req.payload;
            loginManager.login(person).then(result => {
                if(result === 'user not found'){
                    res({message: result});
                }else {
                    res({token: result});
                }
            }).catch((error) => {
                res(error).code(400);
            });
        }
    })
};
