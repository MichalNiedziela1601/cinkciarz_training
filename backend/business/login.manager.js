'use strict';
const loginDAO = require('../dao/login.dao');
const bcrypt = require('bcrypt');
const token = require('../util/token');
const Promise = require('bluebird');

function getUsers()
{
    return loginDAO.getUsers();
}

function getUser(email)
{
    return loginDAO.getUser(email);
}


function checkPassword(email, password)
{
    return loginDAO.checkPassword(email).then((hash) =>
    {
        return bcrypt.compare(password.toString(), hash.password.toString()).then((res) =>
        {

            return res;
        }).catch((error)=> {
            return error;
        });
    }).catch((error) => {
        return error;
    });
}

function login(person)
{
    return getUser(person.email).then((result)=>
    {
        if(result.received === 0){
            return Promise.reject('user not found');
        }else {
            return checkPassword(person.email, person.password).then((hash) =>
            {
                if (hash) {
                    return token(result);
                } else {
                    return Promise.reject('password not match');
                }
            }).catch((error) =>
            {
                return error;
            });
        }
    }).catch((error) =>
    {
        return error;

    });
}

module.exports = {
    getUsers, getUser, checkPassword, login
};
