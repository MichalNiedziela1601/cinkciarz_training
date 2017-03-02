/**
 * Created by sunday on 24.02.17.
 */

'use strict';
const _ = require('lodash');
const registerMenager = require('../business/register.menager');
module.exports = function (server) {

    server.route({
        method: 'POST',
        path: '/api/register',
        handler: function (req, res) {
            let person = req.payload;
            registerMenager.register(person).then((result) => {
                if(_.has(result, 'name')){
                    result.success = false;
                    result.error= result.detail;
                    res(result);
                }else {
                    res(result);
                }
            }).catch((error) => {
                console.log(error);
                res(error).code(400);
            });
        }
    });


};
