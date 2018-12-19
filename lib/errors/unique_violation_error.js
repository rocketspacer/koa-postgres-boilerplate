// Base Error
const ApplicationError = require('./application_error');

// UniqueViolationError Code
const { UNIQUE_VIOLATION_ERROR_CODE } = require('./codes');

// UniqueViolationError
class UniqueViolationError extends ApplicationError {
  constructor({
    code = UNIQUE_VIOLATION_ERROR_CODE,
    message = 'Unique Constraint Violation',
    constraints,
  }) {
    super({
      code     : code,
      message  : message,
      metadata : { constraints },
    });
  }
}

// Exports
module.exports = UniqueViolationError;
