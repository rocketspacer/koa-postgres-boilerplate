// DB errors
const { UniqueViolationError: DBUniqueViolationError } = require('objection-db-errors');

// Forms
const RequestForm = require('./request_form');
const ResponseForm = require('./response_form');

// Errors
const { UniqueViolationError } = require('../../../lib/errors');

// Models
const { User } = require('../../../models');

// Handler
module.exports = async ({ request, response }) => {
  const requestForm = new RequestForm(request.body);
  const requestValidateErr = requestForm.validate();
  if (requestValidateErr) return response.BadRequest(requestValidateErr);

  let user;
  try {
    user = await User
      .query()
      .insert({
        name          : requestForm.name,
        email         : requestForm.email,
        password_hash : await User.getPasswordHash(requestForm.password),
      });
  } catch (err) {
    if (err instanceof DBUniqueViolationError) {
      return response.Conflict(new UniqueViolationError({ constraints: err.columns.map((c) => `${err.table}.${c}`) }));
    }

    throw err;
  }

  await user
    .$relatedQuery('roles')
    .insert({
      name      : `user_${user.id}`,
      user_role : true,
    });

  const deviceType = request.headers['X-Device'.toLowerCase()];
  const responseForm = new ResponseForm({
    id    : user.uid,
    name  : user.name,
    email : user.email,
  });

  response.Ok(responseForm.getPresentationForDevice(deviceType));
};
