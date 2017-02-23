/**
 * Created by sunday on 23.02.17.
 */
'use strict';
const Pool = require('pg').Pool;
const config = require('../postgres_config');
const pool = new Pool({
    user: config.user,
    password: config.password,
    host: config.host,
    database: config.database
});

pool.on('error', function (e, client) {
    console.log(e);
});


function get() {
    let sql = 'SELECT * FROM logs';
    return pool.query(sql).then(result => {
        return result.rows;
    });
}

function save(log) {
    console.log(log);
    let sql = 'INSERT INTO logs (message) values($1)';
    return pool.query(sql, [log.message]).then(() => {
        return true;
    });
}

function reset() {
    let sql = 'DELETE FROM logs';
    return pool.query(sql).then(() => {
        return true;
    });
}

module.exports = {
    get,
    save,
    reset
};