// Dependencies
const Joi = require('joi');

// Errors
const { ValidationError } = require('../../../lib/errors');

// Request form
class RequestForm {
  constructor({ name, email, password }) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static get schema() {
    return Joi.object({
      name     : Joi.string().max(255).required(),
      email    : Joi.string().max(255).email().required(),
      password : Joi.string().max(255).required(),
    });
  }

  validate() {
    const { error } = RequestForm.schema.validate(this, { abortEarly: false });
    if (error) return new ValidationError({ errors: error.details });
  }
}

// Exports
module.exports = RequestForm;
