'use strict';
const Pool = require('pg').Pool;
const config = require('../postgres_config');
const pool = new Pool({
    user: config.user,
    password: config.password,
    host: config.host,
    database: config.database
});

pool.on('error',function(e, client){
    console.log(e);
});

function init(wallet){
    let sql = 'INSERT INTO wallet ("PLN","EUR","GBP","USD") values ($1,$2,$3,$4)';

    return pool.query(sql,[wallet.PLN, wallet.EUR, wallet.GBP, wallet.USD]).then(res => {
        return res;
    });
}

function get(){
    let sql = 'SELECT "PLN","EUR","GBP","USD" FROM wallet';
    return pool.query(sql).then(result => {
        return result.rows[0];
    });
}

function save(wallet)
{
    let sql = 'UPDATE wallet SET "PLN" = $1, "EUR" = $2, "GBP" = $3, "USD" = $4';
    return pool.query(sql, [wallet.PLN, wallet.EUR, wallet.GBP, wallet.USD]).then(result => {
        return true;
    });

}

function reset(){
   let sql = 'DELETE FROM wallet';
    return pool.query(sql).then(result => {
        return true;
    });

}
module.exports = {
    init,
    get,
    save,
    reset
};
