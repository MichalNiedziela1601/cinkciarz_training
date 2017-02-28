/**
 * Created by sunday on 24.02.17.
 */

'use strict';

const registerMenager = require('../business/register.menager');
module.exports = function (server) {

    server.route({
        method: 'POST',
        path: '/api/register',
        handler: function (req, res) {
            let person = req.payload.person;
            registerMenager.register(person).then((result) => {
                res(result);
            }).catch((error) => {
                res(error).code(400);
            });
        }
    });

    server.route({
        method: 'POST',
        path: '/api/check',
        handler: function (req, res) {
            let data = req.payload;

            registerMenager.checkPassword(data.email, data.password).then((response) => {

                res(response);
            });
        }
    });
}
