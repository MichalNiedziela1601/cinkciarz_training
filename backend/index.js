'use strict';
const Hapi = require('hapi');
const config = require('./config');
// const routes = require('./rest/routes');
const plugins = require('./plugins/plugins');


const fs = require('fs');


module.exports = function ()
{
    const server = new Hapi.Server();
    server.connection({
        host: 'localhost', port: config.port
    });
    plugins(server);



    server.start((err) =>
    {

        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });

};
