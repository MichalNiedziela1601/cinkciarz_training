'use strict';

const walletManager = require('../business/wallet.menager');

module.exports = function (server) {

    server.route({
        method: 'GET', path: '/api/wallet', config: {
            auth: 'token'
        }, handler: function (req, replay) {
            let id = req.auth.credentials.id;
            walletManager.getWallet(id).then(function (wallet) {
                replay(wallet);
            }).catch(error => {
                replay(error);
            });

        }
    });

    server.route({
        method: 'POST', path: '/api/wallet', config: {
            auth: 'token'
        }, handler: function (req, res) {

            let wallet = req.payload;
            let id = req.auth.credentials.id;
            walletManager.initWallet(wallet, id).then(() => {
                res();
            })
                .catch(error => {
                    res(error);
                });

        }
    });

    server.route({
        method: 'PUT',
        path: '/api/wallet',
        config: {
            auth: 'token'
        },

        handler: function (req, res) {
           ;

            let wallet = req.payload;
            let id = req.auth.credentials.id;

            walletManager.saveWallet(wallet, id).then(function () {

                res();
            });
        }
    });

    server.route({
        method: 'DELETE', path: '/api/wallet', config: {
            auth: 'token'
        }, handler: function (req, res) {
            let id = req.auth.credentials.id;
            walletManager.resetWallet(id).then(() => {
                res();
            });
        }
    });
};
