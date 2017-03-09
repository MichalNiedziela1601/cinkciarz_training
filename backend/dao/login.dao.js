/**
 * Created by sunday on 01.03.17.
 */
'use strict';
const db = require('./dbConnect');
// db.pgp();



function getUsers() {
  return db.db.any('select id,email,name from person').then((data) => {
        return data;
    });
}

function getUser(email){
    return db.db.one('select id,email,name from person where email = $1',[email]).then((result) => {
        return result;
    }).catch((error) => {
        console.log(error);
        return error;
    });
}

function checkPassword(email){
    let sql = 'SELECT password FROM person WHERE email = $1';

    return db.db.one(sql, [email]).then((result) => {
        return result;
    });
}

module.exports = {
    getUsers,
    getUser,
    checkPassword
};
