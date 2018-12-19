// ApplicationError
class ApplicationError extends Error {
  constructor({
    code = -1,
    message,
    metadata = {},
  }) {
    super();

    Object.assign(this, { code, message, ...metadata });
  }
}

// Exports
module.exports = ApplicationError;
