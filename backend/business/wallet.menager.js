'use strict';
const walletDAO = require('../dao/wallet.dao');
function getWallet(id){
   return walletDAO.get(id);
}

function saveWallet(wallet,id)
{
    return walletDAO.save(wallet,id);
}

function resetWallet(id){
    return walletDAO.reset(id);
}

function initWallet(wallet,id){
    return walletDAO.get(id).then(function(result){
        if(result.length === 0){
           return walletDAO.init(wallet,id);
        }else {
            return walletDAO.save(wallet, id);
        }
    }).catch(error =>{
        console.log('error',error);
        return error;
    });

}
module.exports = {
    initWallet,
    getWallet,
    saveWallet,
    resetWallet
};
