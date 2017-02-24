/**
 * Created by sunday on 22.02.17.
 */
'use strict';
const Good = require('good');

module.exports = function (server) {
    server.register({
        register: Good,
        options: {
            reporters: {
                console: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{
                        response: '*',
                        log: '*'
                    }]
                }, {
                    module: 'good-console'
                }, 'stdout']
            }
        }
    }, (err) => {

        if (err) {
            throw err; // something bad happened loading the plugin
        }
    });
};