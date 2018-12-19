// Dependencies
const path = require('path');

// Config
const config = require('./config');

// Exports
module.exports = {
  client     : 'sqlite3',
  connection : {
    filename: config.get('sqlite.filepath'),
  },
  pool: {
    afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb),
  },

  useNullAsDefault: true,

  seeds: {
    directory: path.join(__dirname, 'db/seeds'),
  },

  migrations: {
    directory : path.join(__dirname, 'db/migrations'),
    tableName : 'migrations',
  },
};
