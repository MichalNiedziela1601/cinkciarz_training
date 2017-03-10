'use strict';
const db = require('./dbConnect');

function get(id) {
    let sql = 'SELECT * FROM logs WHERE person_id = $1';
    return db.db.any(sql,[id]).then(result => {
        return result;
    });
}

function save(log,id) {
    let sql = 'INSERT INTO logs (message,person_id) values($1,$2)';
    return db.db.any(sql, [log.message,id]).then(() => {
        return true;
    });
}

function reset(id) {
    let sql = 'DELETE FROM logs WHERE person_id = $1';
    return db.db.any(sql,[id]).then(() => {
        return true;
    });
}

module.exports = {
    get,
    save,
    reset
};
