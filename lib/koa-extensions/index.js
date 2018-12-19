// Extensions
const requestParams = require('./request_params');
const responseHelpers = require('./response_helpers');

// Exports
module.exports = (app) => {
  requestParams(app);
  responseHelpers(app);
};
