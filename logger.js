// Dependencies
const os = require('os');
const pino = require('pino');

// Config
const config = require('./config');

// Logger
const logger = pino({
  level : config.get('app.log_level'),
  base  : {
    pid      : process.pid,
    hostname : os.hostname(),
    app_name : config.get('app.name'),
  },
});

// Exports
module.exports = logger;
