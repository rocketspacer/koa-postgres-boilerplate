// Dependencies
const merge = require('merge-descriptors');

// Exports
module.exports = (app) => {
  merge(app.context, {
    // Alias koa-router ctx.params -> ctx.request.params
    get params() { return this.request.params; },
    set params(v) { this.request.params = v; },
  });
};
