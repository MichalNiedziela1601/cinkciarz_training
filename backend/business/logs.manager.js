/**
 * Created by sunday on 23.02.17.
 */
'use strict';
const logDAO = require('../dao/log.dao');
function getLogs(){
    return logDAO.get();
}

function saveLog(log){
    // log.data=new Date();
    return logDAO.save(log);
}

function resetLog() {
    return logDAO.reset();
}

module.exports = {
    getLogs,
    saveLog,
    resetLog
};