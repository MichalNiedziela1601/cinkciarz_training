var promise = require('bluebird');
var options = {
    promiseLib: promise
};

var pgp = require('pg-promise')(options);

var cn = require('../postgres_config');
const config = {
    host: cn.host,
    database: cn.database,
    user: cn.user,
    password: cn.password,
    port: cn.port
};

var db = pgp(config);

module.exports = {
    pgp, db
};
