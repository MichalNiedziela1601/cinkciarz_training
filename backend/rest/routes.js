'use strict';
const walletEnd = require('./wallet.endpoint');
const logsEndpoint = require('./logs.endpoint');
const registerEndpoint = require('./register.endpoint');
module.exports = function (server)
{
    walletEnd(server);
    logsEndpoint(server);
    registerEndpoint(server);
}

