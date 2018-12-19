// Base Error
const ApplicationError = require('./application_error');

// ResourceNotFoundError Code
const { RESOURCE_NOT_FOUND_ERROR_CODE } = require('./codes');

// ResourceNotFoundError
class ResourceNotFoundError extends ApplicationError {
  constructor({
    code = RESOURCE_NOT_FOUND_ERROR_CODE,
    message = 'Resource Not Found',
  }) {
    super({ code, message });
  }
}

// Exports
module.exports = ResourceNotFoundError;
