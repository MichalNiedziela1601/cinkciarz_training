'use strict';
const hapiCors = require('./cors.plugin');
module.exports = function(server){
    hapiCors(server);
}
