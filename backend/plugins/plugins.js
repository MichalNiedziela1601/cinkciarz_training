'use strict';
const hapiCors = require('./cors.plugin');
const goodPlugin = require('./good.plugin');
const jwtPlugin = require('./jwt.plugin');
module.exports = function(server){
    hapiCors(server);
    goodPlugin(server);
    jwtPlugin(server);
}
