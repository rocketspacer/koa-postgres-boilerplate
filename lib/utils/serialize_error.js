// Serialize Error Object
// WARNING: Very slow, only use for debugging purposes
const serializeError = (err) => JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));

// Exports
module.exports = serializeError;
