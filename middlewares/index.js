// Middlewares
const authentication = require('./authenticate');
const errorHandler = require('./error_handler');
const operation = require('./operation');

// Exports
module.exports = {
  authentication,
  errorHandler,
  operation,
};
