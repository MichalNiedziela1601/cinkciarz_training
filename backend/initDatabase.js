'use strict';

const db = require('./dao/dbConnect');
const fs = require('fs');

let sql = fs.readFileSync(__dirname + '/init_database.sql').toString();

function init(){
    db.db.none(sql).then(() => {
        process.exit(0);
    });
}

init();
