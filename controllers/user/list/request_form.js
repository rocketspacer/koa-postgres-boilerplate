// Dependencies
const Joi = require('joi');

// Errors
const { ValidationError } = require('../../../lib/errors');

// Request form
class RequestForm {
  constructor({ email, name, limit, offset }) {
    this.email = email;
    this.name = name;
    this.limit = limit;
    this.offset = offset;
  }

  static get schema() {
    return Joi.object({
      email  : Joi.string().max(255).email().required(),
      name   : Joi.string().max(255).required(),
      limit  : Joi.number().min(1).max(100),
      offset : Joi.number().min(0),
    });
  }

  validate() {
    const { error } = RequestForm.schema.validate(this, { abortEarly: false });
    if (error) return new ValidationError({ errors: error.details });
  }
}

// Exports
module.exports = RequestForm;
