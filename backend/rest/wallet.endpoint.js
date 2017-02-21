'use strict';

const walletManager = require('../business/wallet.menager');

module.exports = function (server)
{

    server.route({
        method: 'GET', path: '/api/wallet', handler: function (req, replay)
        {
            const wallet = walletManager.getWallet();
            replay(wallet);
        }
    });

    server.route({
        method: 'POST', path: '/api/wallet', handler: function (req, res)
        {
            let data = req.payload;
            walletManager.saveWallet(data);
            res();
        }
    });

    server.route({
        method: 'DELETE', path: '/api/wallet', handler: function(req,res){
            walletManager.resetWallet();
            res();
        }
    });
};
