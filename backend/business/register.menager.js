'use strict';
const registerDAO = require('../dao/register.dao');
const Promise = require('bluebird');
const bcrypt = require('bcrypt');

const Joi = require('joi');

function validate(person)
{

    var schema = Joi.object().keys({
        name: Joi.string().min(3).max(30).required(),
        password: Joi.string().regex(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).*$/).min(6),
        email: Joi.string().email()
    });

    return Joi.validate(person, schema, function (err)
    {
        return !err ? true : err;
    });

}


function register(person)
{
    let valid = validate(person);
    if (valid === true) {
        const saltCounts = 10;
        let answer = {};
        return bcrypt.hash(person.password, saltCounts).then((hash) =>
        {
            person.password = hash;
            return person;

        }).then((person) =>
        {
            return registerDAO.register(person);
        }).then((data) =>
        {
            answer.success = true;
            return Promise.resolve(data);
        }).catch((error) =>
        {
            answer.success = false;
            answer.error = error;
            return Promise.reject(answer);
        });


    } else {
        console.log(valid);
        let validation = {
            success: false, error: valid
        };
        return Promise.reject(validation);
    }
}

function checkPassword(email, password)
{
    return registerDAO.checkPassword(email).then((hash) =>
    {
        return bcrypt.compare(password.toString(), hash.password.toString()).then((res) =>
        {
            return res;
        });
    });
}

module.exports = {
    register, checkPassword
};
