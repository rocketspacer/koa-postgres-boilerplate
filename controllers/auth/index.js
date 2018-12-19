// Middlewares
const { operation } = require('../../middlewares');

// Handlers
const login = require('./login');
const logout = require('./logout');
const register = require('./register');

// Exports
module.exports = {
  login    : operation('auth.login', login, { authenticate: false }),
  logout   : operation('auth.logout', logout, { authenticate: true }),
  register : operation('auth.registet', register, { authenticate: false }),
};
