'use strict';
const Hapi = require('hapi');
const config = require('./config');
const routes = require('./rest/routes');
const plugins = require('./plugins/plugins');
const Pool = require('pg').Pool;
const configPostgres = require('./postgres_config');

process.on('unhandledRejection', function (e)
{
    console.log(e.message, e.stack);
});

var pool = new Pool(configPostgres);


module.exports = function ()
{
    const server = new Hapi.Server();
    server.connection({
        host: 'localhost', port: config.port
    });
    plugins(server);
    routes(server);
    let sql = 'CREATE TABLE IF NOT EXISTS wallet (id SERIAL PRIMARY KEY,PLN BIGINT,EUR BIGINT,GBP BIGINT,USD BIGINT )';
    pool.query(sql)
            .then(() =>
    {
        server.start((err) =>
        {

            if (err) {
                throw err;
            }
            console.log('Server running at:', server.info.uri);
        });
    });
};
