// Base Error
const ApplicationError = require('./application_error');

// ValidationError Code
const { VALIDATION_ERROR_CODE } = require('./codes');

// ValidationError
class ValidationError extends ApplicationError {
  constructor({
    code = VALIDATION_ERROR_CODE,
    message = 'Validation Failed',
    errors,
  }) {
    super({
      code     : code,
      message  : message,
      metadata : { errors },
    });
  }
}

// Exports
module.exports = ValidationError;
