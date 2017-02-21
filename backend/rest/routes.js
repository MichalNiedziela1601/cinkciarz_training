'use strict';
const walletEnd = require('./wallet.endpoint');
module.exports = function (server)
{
    walletEnd(server);
}

