// Dependencies

// Models
const { ACL } = require('../../models');

// Errors
const { AuthorizationError } = require('../../lib/errors');

// Default options
const defaultOptions = {};

// Exports
module.exports = (options) => {
  const opts = { ...defaultOptions, ...options }; // eslint-disable-line
  return async (ctx, next) => {
    const operationID = ctx.operationID || ctx.request.operationID;
    if (!operationID) {
      return next();
    }

    const auth = ctx.auth || ctx.request.auth;
    if (!auth) {
      return next();
    }

    const operations = await ACL.getUserOperations({ user_id: auth.user_id });
    if (!operations.includes(operationID)) {
      return ctx.response.Forbidden(new AuthorizationError({ message: 'Forbidden' }));
    }

    await next();
  };
};
