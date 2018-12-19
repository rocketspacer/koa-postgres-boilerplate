// Helpers
const helpers = {
  Ok: function (v) {
    this.status = 200;
    this.body = v;
  },
  Conflict: function (v) {
    this.status = 409;
    this.body = v;
  },
  Unauthorized: function (v) {
    this.status = 401;
    this.body = v;
  },
  Forbidden: function (v) {
    this.status = 403;
    this.body = v;
  },
  InternalServerError: function (v) {
    this.status = 500;
    this.body = v;
  },
  BadRequest: function (v) {
    this.status = 400;
    this.body = v;
  },
  UnprocessableEntity: function (v) {
    this.status = 422;
    this.body = v;
  },
  NotFound: function (v) {
    this.status = 404;
    this.body = v;
  },
};

// Exports
module.exports = (app) => {
  Object.assign(app.context, helpers);
  Object.assign(app.response, helpers);
};
