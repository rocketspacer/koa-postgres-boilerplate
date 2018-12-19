// Dependencies
const _ = require('lodash');
const uuid = require('uuid');

// Default options
const defaultOptions = {
  requestHeader  : 'X-Request-ID',
  responseHeader : 'X-Request-ID',
};

// Exports
module.exports = (options = {}) => {
  const opts = { ...defaultOptions, ...options };

  return async (ctx, next) => {
    const requestID = _.isString(opts.requestHeader)
      ? ctx.request.get(opts.requestHeader) || uuid.v1() : uuid.v1();

    ctx.request_id = requestID;
    ctx.request.id = requestID;

    if (_.isString(opts.responseHeader)) {
      ctx.response.set(opts.responseHeader, requestID);
    }

    await next();
  };
};
