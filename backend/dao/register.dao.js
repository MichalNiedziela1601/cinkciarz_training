'use strict';
const db = require('./dbConnect');


function register(person){

    let sql = 'INSERT INTO person (email, password, name) values ($1,$2,$3)';

    return db.db.none(sql, [person.email, person.password, person.name]).then(() => {

    }).catch((error) => {
        return error;
    });
}

function checkUser(person){
    return db.db.any('SELECT id FROM person WHERE email = $1',[person.email]).then(result => {
        return result;
    });
}



module.exports = {
    register,
    checkUser

};
