// Config
const config = require('../config');

// Utils
const { serializeError } = require('../lib/utils');

// Logger
const logger = require('../logger');

// Errors
const { ApplicationError } = require('../lib/errors');

// Exports
module.exports = () => async ({ request, response }, next) => {
  try {
    await next();
  } catch (err) {
    logger.child({ request_id: request.id, operation_id: request.operation_id }).error('Unknown Error', err);
    response.InternalServerError({
      request_id   : request.id,
      operation_id : request.operation_id,
      error        : new ApplicationError({
        message  : 'Unknown Error',
        metadata : config.get('app.env') === 'development' ? serializeError(err) : undefined,
      }),
    });
  }
};
