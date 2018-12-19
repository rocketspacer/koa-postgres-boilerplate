// Dependencies
const path = require('path');
const fs = require('fs');
const convict = require('convict');
const yaml = require('js-yaml');

// Add custom parsers
convict.addParser([
  { extension: ['yml', 'yaml'], parse: yaml.safeLoad },
]);

// Application configurations schema
const app = {
  env: {
    doc     : 'Application environment',
    format  : ['development', 'test', 'staging', 'production'],
    default : 'development',
    env     : 'NODE_ENV',
    arg     : 'env',
  },
  name: {
    doc     : 'Name of the application',
    format  : String,
    default : null,
    env     : 'NAME',
    arg     : 'name',
  },
  port: {
    doc     : 'The port to bind the server to',
    format  : 'port',
    default : 8080,
    env     : 'PORT',
    arg     : 'port',
  },
  log_level: {
    doc     : 'Application log level',
    format  : ['silent', 'fatal', 'error', 'warn', 'info', 'debug', 'trace'],
    default : 'info',
  },
};

// SQLite configurations schema
const sqlite = {
  filepath: {
    doc    : 'Path to the sqlite database file',
    format : (val) => {
      const stats = fs.statSync(val);
      if (!stats.isFile()) throw new Error(`Configuration value 'filepath' '${val}' is not a file`);
    },
    default: null,
  },
};

// Build and load configurations
const config = convict({ app, sqlite });
config.loadFile(path.join(__dirname, `environments/${config.get('app.env')}.yaml`));
config.validate();

// Exports
module.exports = config;
