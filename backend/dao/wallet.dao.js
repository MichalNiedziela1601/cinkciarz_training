'use strict';
const db = require('./dbConnect');

function init(wallet,id){
    let sql = 'INSERT INTO wallet (pln,eur,gbp,usd,person_id) values ($1,$2,$3,$4,$5)';

    return db.db.none(sql,[wallet.PLN, wallet.EUR, wallet.GBP, wallet.USD, id]).then(() => {

    });
}

function get(id){
    let sql = 'SELECT pln, eur,gbp, usd FROM wallet WHERE person_id = $1';
    return db.db.any(sql, [id]).then(result => {
        return result;
    }).catch(error => {
        return error;
    });
}

function save(wallet,id)
{
    let sql = 'UPDATE wallet SET pln = $1, eur = $2, gbp = $3, usd = $4 WHERE person_id = $5';
    return db.db.any(sql, [wallet.PLN, wallet.EUR, wallet.GBP, wallet.USD,id]).then(() => {

    });

}

function reset(id){
    let sql = 'UPDATE wallet SET pln = $1, eur = $2, gbp = $3, usd = $4 WHERE person_id = $5';
    return db.db.any(sql, [0, 0, 0, 0,id]).then(() => {

    });

}
module.exports = {
    init,
    get,
    save,
    reset
};
