'use strict';
const walletEnd = require('./wallet.endpoint');
const logsEndpoint = require('./logs.endpoint');
const registerEndpoint = require('./register.endpoint');
const loginEndpoint = require('./login.endpoint');
module.exports = function (server)
{
    walletEnd(server);
    logsEndpoint(server);
    registerEndpoint(server);
    loginEndpoint(server);
}

