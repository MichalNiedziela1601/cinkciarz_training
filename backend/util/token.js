'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config');

function createToken(person){
    return jwt.sign({ id: person.id, email: person.email, name: person.name},config.secret, { algorithm: 'HS256', expiresIn: '1h'});
}
module.exports = createToken;
