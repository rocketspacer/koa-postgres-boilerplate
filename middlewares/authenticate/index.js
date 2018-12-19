// Dependencies

// Models
const { LoginSession } = require('../../models');

// Errors
const { AuthenticationError } = require('../../lib/errors');

// Default options
const defaultOptions = {
  sessionTTL : 2 * 60 * 60 * 1000, // 2 hours
  authHeader : 'Authorization',
};

// Exports
module.exports = (options) => {
  const opts = { ...defaultOptions, ...options };
  return async (ctx, next) => {
    const session_id = ctx.request.get(opts.authHeader);
    if (!session_id) {
      return ctx.response.Unauthorized(new AuthenticationError({ message: 'Unauthorized' }));
    }

    const session = await LoginSession
      .query()
      .where({ uid: session_id })
      .first();

    if (!session) {
      return ctx.response.Unauthorized(new AuthenticationError({ message: 'Unauthorized' }));
    }

    if (session.issued_at + opts.sessionTTL <= Date.now()) {
      return ctx.response.Unauthorized(new AuthenticationError({ message: 'Unauthorized' }));
    }

    const auth = {
      session_id : session.id,
      user_id    : session.user_id,
    };

    ctx.auth = auth;
    ctx.request.auth = auth;

    await next();

    await session.refresh();
    ctx.response.set('X-Session-ID', session.uid);
  };
};
