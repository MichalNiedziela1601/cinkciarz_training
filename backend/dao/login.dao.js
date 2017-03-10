'use strict';
const db = require('./dbConnect');



function getUser(email){
    return db.db.one('select id,email,name from person where email = $1',[email]).then((result) => {
        return result;
    }).catch(error => {
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
    getUser,
    checkPassword
};
