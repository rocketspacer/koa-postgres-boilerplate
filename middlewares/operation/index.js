// Dependencies
const compose = require('koa-compose');

// Middlewares
const authenticate = require('../authenticate');
const authorize = require('../authorize');
const requestID = require('../request-id');

// Default options
const defaultOptions = {
  authenticate : false,
  authorize    : true,
};

// Exports
module.exports = (operationID, operationFn, options = {}) => {
  const opts = { operationID, ...defaultOptions, ...options };

  const stack = [
    requestID({ requestHeader: 'X-Request-ID', responseHeader: 'X-Request-ID' }),
    async (ctx, next) => {
      ctx.operationID = opts.operationID;
      ctx.request.operationID = opts.operationID;

      ctx.response.set('X-Operation-ID', opts.operationID);

      await next(ctx);

      if (ctx.body instanceof Error) {
        ctx.body = { operationID: ctx.request.operationID, requestID: ctx.request.id, error: ctx.body };
      } else {
        ctx.body = { operationID: ctx.request.operationID, requestID: ctx.request.id, data: ctx.body };
      }
    },
    opts.authenticate ? authenticate(opts.authenticate) : null,
    opts.authorize ? authorize() : null,
    operationFn,
  ];

  return compose(stack.filter((m) => m));
};
