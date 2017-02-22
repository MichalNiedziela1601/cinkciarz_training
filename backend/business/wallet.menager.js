'use strict';
const walletDAO = require('../dao/wallet.dao');
function getWallet(){
   return walletDAO.get();
}

function saveWallet(wallet)
{
    return walletDAO.save(wallet);
}

function resetWallet(){
    return walletDAO.reset();
}

function initWallet(wallet){
    return walletDAO.init(wallet);
}
module.exports = {
    initWallet,
    getWallet,
    saveWallet,
    resetWallet
};
