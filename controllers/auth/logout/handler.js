// Errors
const { AuthenticationError } = require('../../../lib/errors');

// Models
const { LoginSession } = require('../../../models');

// Exports
module.exports = async ({ request, response }) => {
  const { auth } = request;
  if (!auth) {
    throw new AuthenticationError({ message: 'Missing Authentication Info' });
  }

  await LoginSession
    .query()
    .delete()
    .where({ uid: auth.session_id });

  return response.Ok({ message: 'Logout successfully' });
};
