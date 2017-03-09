'use strict';
const loginManager = require('../business/login.manager');

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
                res({token: result});
            }).catch((error) => {
                res(error).code(400);
            });
        }
    })
};
