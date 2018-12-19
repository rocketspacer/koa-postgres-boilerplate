// Base Error
const ApplicationError = require('./application_error');

// AuthenticationError Code
const { AUTHENTICATION_ERROR_CODE } = require('./codes');

// AuthenticationError
class AuthenticationError extends ApplicationError {
  constructor({
    code = AUTHENTICATION_ERROR_CODE,
    message = 'Authentication Error',
  }) {
    super({ code, message });
  }
}

// Exports
module.exports = AuthenticationError;
