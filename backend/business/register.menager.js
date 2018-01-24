'use strict';
const registerDAO = require('../dao/register.dao');
const Promise = require('bluebird');
const bcrypt = require('bcrypt');
const _ = require('lodash');

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
    console.log(person);
    let answer = {};
    return registerDAO.checkUser(person).then(result => {
        if(_.has(result[0],'id')) {
            answer.success = false;
            answer.error = 'Istnieje już taka nazwa użytkownika';
            return Promise.reject(answer);
        } else{
            let valid = validate(person);
            if (valid === true) {
                const saltCounts = 10;

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
    });

}



module.exports = {
    register
};
