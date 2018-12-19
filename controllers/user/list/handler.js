// Forms
const RequestForm = require('./request_form');

// Models
const { User } = require('../../../models');

// Exports
module.exports = async ({ request, response }) => {
  const requestForm = new RequestForm({
    email  : request.query.email,
    name   : request.query.name,
    limit  : request.query.limit || 25,
    offset : request.query.offset || 0,
  });
  const requestValidateErr = requestForm.validate();
  if (requestValidateErr) return response.BadRequest(requestValidateErr);

  const users = await User
    .query()
    .where({
      email : requestForm.email,
      name  : requestForm.name,
    })
    .limit(requestForm.limit)
    .offset(requestForm.offset);

  response.Ok({ users });
};
