// Middlewares
const { operation } = require('../../middlewares');

// Handlers
const get = require('./get');
const list = require('./list');

// Exports
module.exports = {
  get  : operation('user.get', get, { authenticate: true }),
  list : operation('user.list', list, { authenticate: true }),
};
