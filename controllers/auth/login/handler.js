// Forms
const RequestForm = require('./request_form');
const ResponseForm = require('./response_form');

// Errors
const { AuthenticationError, ResourceNotFoundError } = require('../../../lib/errors');

// Models
const { LoginSession, User } = require('../../../models');

// Handler
module.exports = async ({ request, response }) => {
  const requestForm = new RequestForm(request.body);
  const requestValidateErr = requestForm.validate();
  if (requestValidateErr) return response.BadRequest(requestValidateErr);

  const user = await User
    .query()
    .where({ email: requestForm.email })
    .first();

  if (!user) return response.NotFound(new ResourceNotFoundError({ message: 'User Not Found' }));

  const validPassword = await user.verifyPassword(requestForm.password);
  if (!validPassword) return response.Unauthorized(new AuthenticationError({ message: 'Incorrect Password' }));

  const session = await LoginSession
    .query()
    .insert({ user_id: user.id });

  response.set('X-Session-ID', session.uid);

  const deviceType = request.headers['X-Device'.toLowerCase()];
  const responseForm = new ResponseForm({
    session_id : session.uid,
    user_id    : user.uid,
  });

  response.Ok(responseForm.getPresentationForDevice(deviceType));
};
