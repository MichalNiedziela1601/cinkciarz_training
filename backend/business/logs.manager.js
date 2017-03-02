/**
 * Created by sunday on 23.02.17.
 */
'use strict';
const logDAO = require('../dao/log.dao');
function getLogs(id){
    return logDAO.get(id);
}

function saveLog(log,id){
    return logDAO.save(log,id);
}

function resetLog(id) {
    return logDAO.reset(id);
}

module.exports = {
    getLogs,
    saveLog,
    resetLog
};
