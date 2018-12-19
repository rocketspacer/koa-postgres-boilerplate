// Base Error
const ApplicationError = require('./application_error');

// AuthorizationError Code
const { AUTHORIZATION_ERROR_CODE } = require('./codes');

// AuthorizationError
class AuthorizationError extends ApplicationError {
  constructor({
    code = AUTHORIZATION_ERROR_CODE,
    message = 'Authorization Error',
  }) {
    super({ code, message });
  }
}

// Exports
module.exports = AuthorizationError;
