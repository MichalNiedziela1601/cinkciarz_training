'use strict';
const registerDAO = require('../dao/register.dao');
const Promise = require('bluebird');
const bcrypt = require('bcrypt');

const Joi = require('joi');

function validate(person) {
    console.log('peron obj', person);

    var schema = Joi.object().keys({
        name: Joi.string().min(3).max(30),
        password: Joi.string().regex(/^[a-zA-Z0-9_@./#&+-/!]{6,30}$/).required(),
        email: Joi.string().email()
    });

    return Joi.validate(person, schema, function (err) {
        return !err ? true : err;
    });

}


function register(person) {
    let valid = validate(person);
    if (valid === true) {
        const saltCounts = 10;
        return bcrypt.hash(person.password, saltCounts).then((hash) => {
            person.password = hash;
            return registerDAO.register(person);
        })
            .catch((error) => {
                return Promise.reject(error);
            });
    } else {
        let validation = {
            message: 'Not Valid',
            error: valid
        };
        return Promise.reject(validation);
    }
}

function checkPassword(email, password) {
    return registerDAO.checkPassword(email).then((hash) => {
        return bcrypt.compare(password.toString(), hash.password.toString()).then((res) => {
            return res;
        });
    });
}

module.exports = {
    register,
    checkPassword
};