// Exports
module.exports = {
  AUTHENTICATION_ERROR_CODE     : 'E401000',
  AUTHORIZATION_ERROR_CODE      : 'E403000',
  RESOURCE_NOT_FOUND_ERROR_CODE : 'E404000',
  UNIQUE_VIOLATION_ERROR_CODE   : 'E409001',
  VALIDATION_ERROR_CODE         : 'E400001',
};

// Validate code uniqueness
const codes = new Set(Object.keys(module.exports).map((k) => module.exports[k]));
if (codes.size !== Object.keys(module.exports).length) throw new Error('Collided error codes');
