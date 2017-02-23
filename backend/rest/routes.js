'use strict';
const walletEnd = require('./wallet.endpoint');
const logsEndpoint = require('./logs.endpoint');
module.exports = function (server)
{
    walletEnd(server);
    logsEndpoint(server);
}

