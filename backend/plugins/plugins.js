'use strict';
const hapiCors = require('./cors.plugin');
const goodPlugin = require('./good.plugin');
module.exports = function(server){
    hapiCors(server);
    goodPlugin(server);
}
