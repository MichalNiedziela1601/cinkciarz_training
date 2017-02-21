'use strict';
const walletDAO = require('../dao/wallet.dao');
function getWallet(){
    return walletDAO.get();
}

function saveWallet(wallet)
{
    walletDAO.save(wallet);
}

function resetWallet(){
    walletDAO.reset();
}
module.exports = {
    getWallet,
    saveWallet,
    resetWallet
}
