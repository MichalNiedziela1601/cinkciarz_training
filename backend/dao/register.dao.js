'use strict';
const Pool = require('pg').Pool;
const config = require('../postgres_config');
const Promise = require('bluebird');
const pool = new Pool({
    user: config.user,
    password: config.password,
    host: config.host,
    database: config.database
});

pool.on('error',function(e, client){
    console.log(e);
});



function register(person){

    let sql = 'INSERT INTO person (email, password, name) values ($1,$2,$3)';

    return pool.query(sql, [person.email, person.password, person.name]).then(() => {
        return Promise.resolve();
    }).catch((error) => {
        console.log('error',error);
        return Promise.reject(error);
    });
}



function checkPassword(email){
    let sql = 'SELECT password FROM person WHERE email = $1';

    return pool.query(sql, [email]).then((result) => {
        return result.rows[0];
    });
}

module.exports = {
    register,
    checkPassword
};
