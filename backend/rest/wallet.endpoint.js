'use strict';

const walletManager = require('../business/wallet.menager');

module.exports = function (server) {

    server.route({
        method: 'GET', path: '/api/wallet', handler: function (req, replay) {
            walletManager.getWallet().then(function(wallet){
                replay(wallet);
            });

        }
    });

    server.route({
        method: 'POST', path: '/api/wallet', handler: function (req, res) {
            let data = req.payload;
            walletManager.initWallet(data).then(() => {
                res();
            });

        }
    });

    server.route({
        method: 'PUT',
        path: '/api/wallet',
        handler: function (req, res) {
            let data = req.payload;
            walletManager.saveWallet(data).then(function(){
                res();
            });


        }
    });

    server.route({
        method: 'DELETE', path: '/api/wallet', handler: function (req, res) {
            walletManager.resetWallet().then(() => {
                res();
            });
        }
    });
};
